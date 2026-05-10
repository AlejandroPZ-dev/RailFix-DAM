package com.railfix.dam.service;

import com.railfix.dam.dto.AsignacionRequest;
import com.railfix.dam.dto.AsignacionResponse;
import com.railfix.dam.dto.TecnicoIncidenciaDetailResponse;
import com.railfix.dam.dto.TecnicoIncidenciaResponse;
import com.railfix.dam.entity.AsignacionIncidencia;
import com.railfix.dam.entity.Incidencia;
import com.railfix.dam.entity.Usuario;
import com.railfix.dam.entity.enums.EstadoAsignacion;
import com.railfix.dam.entity.enums.EstadoIncidencia;
import com.railfix.dam.entity.enums.Rol;
import com.railfix.dam.repository.AsignacionIncidenciaRepository;
import com.railfix.dam.repository.IncidenciaRepository;
import com.railfix.dam.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class AsignacionIncidenciaService {

    private final AsignacionIncidenciaRepository asignacionIncidenciaRepository;
    private final IncidenciaRepository incidenciaRepository;
    private final UsuarioRepository usuarioRepository;
    private final HistorialIncidenciaService historialIncidenciaService;

    public AsignacionIncidenciaService(
        AsignacionIncidenciaRepository asignacionIncidenciaRepository,
        IncidenciaRepository incidenciaRepository,
        UsuarioRepository usuarioRepository,
        HistorialIncidenciaService historialIncidenciaService
    ) {
        this.asignacionIncidenciaRepository = asignacionIncidenciaRepository;
        this.incidenciaRepository = incidenciaRepository;
        this.usuarioRepository = usuarioRepository;
        this.historialIncidenciaService = historialIncidenciaService;
    }

    public List<AsignacionResponse> findByIncidenciaId(Long incidenciaId) {
        return asignacionIncidenciaRepository.findByIncidenciaIdIncidencia(incidenciaId).stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Optional<List<AsignacionResponse>> create(Long incidenciaId, AsignacionRequest request) {
        Optional<Incidencia> incidenciaOptional = incidenciaRepository.findById(incidenciaId);
        Optional<Usuario> administradorOptional = usuarioRepository.findById(request.getIdAdministrador());

        if (incidenciaOptional.isEmpty() || administradorOptional.isEmpty()) {
            return Optional.empty();
        }

        Usuario administrador = administradorOptional.get();
        if (administrador.getRol() != Rol.ADMINISTRADOR) {
            return Optional.empty();
        }

        Incidencia incidencia = incidenciaOptional.get();
        EstadoIncidencia estadoAnterior = incidencia.getEstado();
        List<AsignacionResponse> createdResponses = new ArrayList<>();

        for (Long tecnicoId : request.getTecnicoIds()) {
            Optional<Usuario> tecnicoOptional = usuarioRepository.findById(tecnicoId);
            if (tecnicoOptional.isEmpty()) {
                return Optional.empty();
            }

            Usuario tecnico = tecnicoOptional.get();
            if (tecnico.getRol() != Rol.TECNICO) {
                return Optional.empty();
            }

            if (asignacionIncidenciaRepository
                .findByIncidenciaIdIncidenciaAndTecnicoIdUsuario(incidenciaId, tecnicoId)
                .isPresent()) {
                continue;
            }

            AsignacionIncidencia asignacion = new AsignacionIncidencia();
            asignacion.setIncidencia(incidencia);
            asignacion.setTecnico(tecnico);
            asignacion.setAdministrador(administrador);
            asignacion.setEstadoAsignacion(EstadoAsignacion.ASIGNADA);

            AsignacionIncidencia saved = asignacionIncidenciaRepository.save(asignacion);
            createdResponses.add(toResponse(saved));

            if (incidencia.getEstado() == EstadoIncidencia.ABIERTA) {
                incidencia.setEstado(EstadoIncidencia.ASIGNADA);
            }

            historialIncidenciaService.createEntry(
                incidencia,
                administrador,
                "ASIGNADA",
                estadoAnterior.name(),
                incidencia.getEstado().name(),
                "Técnico " + tecnico.getNombre() + " " + tecnico.getApellidos() + " asignado a la incidencia"
            );
        }

        if (createdResponses.isEmpty()) {
            return Optional.of(List.of());
        }

        incidencia.setFechaActualizacion(LocalDateTime.now());
        incidenciaRepository.save(incidencia);

        return Optional.of(createdResponses);
    }

    public boolean delete(Long incidenciaId, Long idAsignacion) {
        Optional<AsignacionIncidencia> asignacionOptional =
            asignacionIncidenciaRepository.findByIdAsignacionAndIncidenciaIdIncidencia(idAsignacion, incidenciaId);

        if (asignacionOptional.isEmpty()) {
            return false;
        }

        AsignacionIncidencia asignacion = asignacionOptional.get();
        Incidencia incidencia = asignacion.getIncidencia();
        Usuario administrador = asignacion.getAdministrador();

        historialIncidenciaService.createEntry(
            incidencia,
            administrador,
            "TECNICO_DESASIGNADO",
            incidencia.getEstado().name(),
            incidencia.getEstado().name(),
            "Técnico " + asignacion.getTecnico().getNombre() + " "
                + asignacion.getTecnico().getApellidos() + " desasignado de la incidencia"
        );

        asignacionIncidenciaRepository.delete(asignacion);
        incidencia.setFechaActualizacion(LocalDateTime.now());
        incidenciaRepository.save(incidencia);

        return true;
    }

    public List<TecnicoIncidenciaResponse> findIncidenciasByTecnicoId(Long tecnicoId) {
        if (!isTecnicoActivo(tecnicoId)) {
            return List.of();
        }

        return asignacionIncidenciaRepository.findByTecnicoIdUsuario(tecnicoId).stream()
            .map(this::toTecnicoIncidenciaResponse)
            .collect(Collectors.toList());
    }

    public Optional<TecnicoIncidenciaDetailResponse> findDetailByTecnicoId(Long tecnicoId, Long incidenciaId) {
        if (!isTecnicoActivo(tecnicoId)) {
            return Optional.empty();
        }

        return asignacionIncidenciaRepository.findByIncidenciaIdIncidenciaAndTecnicoIdUsuario(incidenciaId, tecnicoId)
            .map(this::toTecnicoIncidenciaDetailResponse);
    }

    public Optional<AsignacionIncidencia> findByIncidenciaAndTecnico(Long incidenciaId, Long tecnicoId) {
        return asignacionIncidenciaRepository.findByIncidenciaIdIncidenciaAndTecnicoIdUsuario(incidenciaId, tecnicoId);
    }

    public AsignacionIncidencia save(AsignacionIncidencia asignacion) {
        return asignacionIncidenciaRepository.save(asignacion);
    }

    private AsignacionResponse toResponse(AsignacionIncidencia asignacion) {
        return new AsignacionResponse(
            asignacion.getIdAsignacion(),
            asignacion.getTecnico().getIdUsuario(),
            asignacion.getTecnico().getNombre() + " " + asignacion.getTecnico().getApellidos(),
            asignacion.getAdministrador().getIdUsuario(),
            asignacion.getEstadoAsignacion().name(),
            asignacion.getFechaAsignacion()
        );
    }

    private TecnicoIncidenciaResponse toTecnicoIncidenciaResponse(AsignacionIncidencia asignacion) {
        Incidencia incidencia = asignacion.getIncidencia();

        return new TecnicoIncidenciaResponse(
            incidencia.getIdIncidencia(),
            incidencia.getTitulo(),
            incidencia.getLinea().getIdLinea(),
            incidencia.getLinea().getNombre(),
            incidencia.getVia().getIdVia(),
            incidencia.getVia().getNombre(),
            incidencia.getPuntoKilometrico(),
            incidencia.getUrgencia().name(),
            incidencia.getEstado().name(),
            asignacion.getEstadoAsignacion().name(),
            asignacion.getFechaAsignacion()
        );
    }

    private TecnicoIncidenciaDetailResponse toTecnicoIncidenciaDetailResponse(AsignacionIncidencia asignacion) {
        Incidencia incidencia = asignacion.getIncidencia();

        return new TecnicoIncidenciaDetailResponse(
            incidencia.getIdIncidencia(),
            incidencia.getTitulo(),
            incidencia.getDescripcion(),
            incidencia.getLinea().getIdLinea(),
            incidencia.getLinea().getNombre(),
            incidencia.getVia().getIdVia(),
            incidencia.getVia().getNombre(),
            incidencia.getPuntoKilometrico(),
            incidencia.getUrgencia().name(),
            incidencia.getEstado().name(),
            incidencia.getFechaCreacion(),
            incidencia.getFechaActualizacion(),
            incidencia.getFechaCierre(),
            asignacion.getEstadoAsignacion().name(),
            asignacion.getFechaAsignacion()
        );
    }

    private boolean isTecnicoActivo(Long tecnicoId) {
        return usuarioRepository.findById(tecnicoId)
            .filter(Usuario::getActivo)
            .map(usuario -> usuario.getRol() == Rol.TECNICO)
            .orElse(false);
    }
}
