package com.railfix.dam.service;

import com.railfix.dam.dto.AdjuntoIncidenciaResponse;
import com.railfix.dam.entity.AdjuntoIncidencia;
import com.railfix.dam.entity.Incidencia;
import com.railfix.dam.entity.Usuario;
import com.railfix.dam.repository.AdjuntoIncidenciaRepository;
import com.railfix.dam.repository.IncidenciaRepository;
import com.railfix.dam.repository.UsuarioRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdjuntoIncidenciaService {

    private static final long MAX_FILE_SIZE_BYTES = 5L * 1024L * 1024L;
    private static final int MAX_ATTACHMENTS_PER_INCIDENT = 3;
    private static final Map<String, String> ALLOWED_TYPES = Map.of(
        "image/jpeg", "jpg",
        "image/png", "png",
        "image/webp", "webp"
    );

    private final AdjuntoIncidenciaRepository adjuntoIncidenciaRepository;
    private final IncidenciaRepository incidenciaRepository;
    private final UsuarioRepository usuarioRepository;
    private final Path uploadRoot;

    public AdjuntoIncidenciaService(
        AdjuntoIncidenciaRepository adjuntoIncidenciaRepository,
        IncidenciaRepository incidenciaRepository,
        UsuarioRepository usuarioRepository,
        @Value("${app.upload-dir:uploads}") String uploadDir
    ) {
        this.adjuntoIncidenciaRepository = adjuntoIncidenciaRepository;
        this.incidenciaRepository = incidenciaRepository;
        this.usuarioRepository = usuarioRepository;
        this.uploadRoot = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    @Transactional
    public List<AdjuntoIncidenciaResponse> uploadAdjuntos(
        Long incidenciaId,
        Long idUsuario,
        List<MultipartFile> files
    ) {
        Incidencia incidencia = incidenciaRepository.findById(incidenciaId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Incident not found"));

        Usuario usuario = usuarioRepository.findById(idUsuario)
            .filter(Usuario::getActivo)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (files == null || files.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No files were provided");
        }

        long currentAttachments = adjuntoIncidenciaRepository.countByIncidenciaIdIncidencia(incidenciaId);
        if (currentAttachments + files.size() > MAX_ATTACHMENTS_PER_INCIDENT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Maximum 3 images per incident");
        }

        for (MultipartFile file : files) {
            validateFile(file);
        }

        Path incidentDirectory = uploadRoot.resolve("incidencias").resolve(String.valueOf(incidenciaId)).normalize();
        List<Path> writtenFiles = new ArrayList<>();
        List<AdjuntoIncidencia> savedAdjuntos = new ArrayList<>();

        try {
            Files.createDirectories(incidentDirectory);

            for (MultipartFile file : files) {
                String originalFilename = sanitizeOriginalFilename(file.getOriginalFilename());
                String storedFilename = buildStoredFilename(file.getContentType());
                Path targetFile = incidentDirectory.resolve(storedFilename).normalize();

                if (!targetFile.startsWith(incidentDirectory)) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file path");
                }

                Files.copy(file.getInputStream(), targetFile, StandardCopyOption.REPLACE_EXISTING);
                writtenFiles.add(targetFile);

                AdjuntoIncidencia adjunto = new AdjuntoIncidencia();
                adjunto.setIncidencia(incidencia);
                adjunto.setUsuarioSubida(usuario);
                adjunto.setNombreArchivoOriginal(originalFilename);
                adjunto.setNombreArchivoGuardado(storedFilename);
                adjunto.setRutaArchivo(buildRelativePath(incidenciaId, storedFilename));
                adjunto.setTipoMime(file.getContentType());
                adjunto.setTamanoBytes(file.getSize());

                savedAdjuntos.add(adjuntoIncidenciaRepository.save(adjunto));
            }
        } catch (IOException exception) {
            cleanupFiles(writtenFiles);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not store attachment files");
        } catch (RuntimeException exception) {
            cleanupFiles(writtenFiles);
            throw exception;
        }

        return savedAdjuntos.stream().map(this::toResponse).toList();
    }

    public List<AdjuntoIncidenciaResponse> findByIncidenciaId(Long incidenciaId) {
        if (!incidenciaRepository.existsById(incidenciaId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Incident not found");
        }

        return adjuntoIncidenciaRepository.findByIncidenciaIdIncidenciaOrderByFechaSubidaDesc(incidenciaId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    public DownloadAdjuntoData getDownloadData(Long idAdjunto) {
        AdjuntoIncidencia adjunto = adjuntoIncidenciaRepository.findById(idAdjunto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attachment not found"));

        Path filePath = Paths.get("").toAbsolutePath().resolve(adjunto.getRutaArchivo()).normalize();
        if (!filePath.startsWith(uploadRoot)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid attachment path");
        }

        if (!Files.exists(filePath)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attachment not found");
        }

        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attachment not found");
            }

            return new DownloadAdjuntoData(resource, adjunto.getTipoMime(), adjunto.getNombreArchivoOriginal());
        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not read attachment");
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.containsKey(contentType.toLowerCase(Locale.ROOT))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only JPG, PNG or WEBP images are allowed");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Maximum file size is 5 MB");
        }
    }

    private String sanitizeOriginalFilename(String originalFilename) {
        String cleanFilename = StringUtils.cleanPath(
            Optional.ofNullable(originalFilename).orElse("imagen")
        );
        return Paths.get(cleanFilename).getFileName().toString();
    }

    private String buildStoredFilename(String contentType) {
        String extension = ALLOWED_TYPES.get(contentType.toLowerCase(Locale.ROOT));
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String randomSuffix = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        return timestamp + "_" + randomSuffix + "." + extension;
    }

    private String buildRelativePath(Long incidenciaId, String storedFilename) {
        return "uploads/incidencias/" + incidenciaId + "/" + storedFilename;
    }

    private void cleanupFiles(List<Path> writtenFiles) {
        for (Path writtenFile : writtenFiles) {
            try {
                Files.deleteIfExists(writtenFile);
            } catch (IOException ignored) {
                // Keep cleanup simple for the MVP.
            }
        }
    }

    private AdjuntoIncidenciaResponse toResponse(AdjuntoIncidencia adjunto) {
        return new AdjuntoIncidenciaResponse(
            adjunto.getIdAdjunto(),
            adjunto.getIncidencia().getIdIncidencia(),
            adjunto.getNombreArchivoOriginal(),
            adjunto.getNombreArchivoGuardado(),
            adjunto.getTipoMime(),
            adjunto.getTamanoBytes(),
            adjunto.getFechaSubida(),
            "/api/adjuntos/" + adjunto.getIdAdjunto() + "/download"
        );
    }

    public static class DownloadAdjuntoData {
        private final Resource resource;
        private final String tipoMime;
        private final String nombreArchivoOriginal;

        public DownloadAdjuntoData(Resource resource, String tipoMime, String nombreArchivoOriginal) {
            this.resource = resource;
            this.tipoMime = tipoMime;
            this.nombreArchivoOriginal = nombreArchivoOriginal;
        }

        public Resource getResource() {
            return resource;
        }

        public String getTipoMime() {
            return tipoMime;
        }

        public String getNombreArchivoOriginal() {
            return nombreArchivoOriginal;
        }
    }
}
