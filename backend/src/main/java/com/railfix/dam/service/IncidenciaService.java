package com.railfix.dam.service;

import com.railfix.dam.dto.CerrarIncidenciaRequest;
import com.railfix.dam.dto.CreateIncidenciaRequest;
import com.railfix.dam.dto.IncidenciaResponse;
import com.railfix.dam.dto.UpdateIncidenciaDescripcionRequest;
import com.railfix.dam.dto.UpdateIncidenciaEstadoRequest;
import com.railfix.dam.dto.UpdateIncidenciaUrgenciaRequest;
import com.railfix.dam.entity.Incidencia;
import com.railfix.dam.entity.Linea;
import com.railfix.dam.entity.Usuario;
import com.railfix.dam.entity.Via;
import com.railfix.dam.entity.enums.EstadoIncidencia;
import com.railfix.dam.entity.enums.Rol;
import com.railfix.dam.entity.enums.UrgenciaIncidencia;
import com.railfix.dam.repository.LineaRepository;
import com.railfix.dam.repository.IncidenciaRepository;
import com.railfix.dam.repository.UsuarioRepository;
import com.railfix.dam.repository.ViaRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class IncidenciaService {

    private final IncidenciaRepository incidenciaRepository;
    private final LineaRepository lineaRepository;
    private final ViaRepository viaRepository;
    private final UsuarioRepository usuarioRepository;
    private final OperarioIncidenciaValidator operarioIncidenciaValidator;
    private final HistorialIncidenciaService historialIncidenciaService;

    public IncidenciaService(
        IncidenciaRepository incidenciaRepository,
        LineaRepository lineaRepository,
        ViaRepository viaRepository,
        UsuarioRepository usuarioRepository,
        OperarioIncidenciaValidator operarioIncidenciaValidator,
        HistorialIncidenciaService historialIncidenciaService
    ) {
        this.incidenciaRepository = incidenciaRepository;
        this.lineaRepository = lineaRepository;
        this.viaRepository = viaRepository;
        this.usuarioRepository = usuarioRepository;
        this.operarioIncidenciaValidator = operarioIncidenciaValidator;
        this.historialIncidenciaService = historialIncidenciaService;
    }

    public List<Incidencia> findAll() {
        return incidenciaRepository.findAll();
    }

    public List<IncidenciaResponse> findAllResponses() {
        return incidenciaRepository.findAll().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Optional<Incidencia> findById(Long id) {
        return incidenciaRepository.findById(id);
    }

    public Optional<IncidenciaResponse> findResponseById(Long id) {
        return incidenciaRepository.findById(id).map(this::toResponse);
    }

    public Optional<IncidenciaResponse> create(CreateIncidenciaRequest request) {
        Optional<Linea> lineaOptional = lineaRepository.findById(request.getLineaId());
        Optional<Via> viaOptional = viaRepository.findById(request.getViaId());
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(request.getOperarioCreadorId());

        if (lineaOptional.isEmpty() || viaOptional.isEmpty() || usuarioOptional.isEmpty()) {
            return Optional.empty();
        }

        Linea linea = lineaOptional.get();
        Via via = viaOptional.get();
        Usuario usuario = usuarioOptional.get();

        if (!operarioIncidenciaValidator.isOperarioActivo(usuario)) {
            return Optional.empty();
        }

        if (!operarioIncidenciaValidator.viaPerteneceALinea(via, linea)) {
            return Optional.empty();
        }

        if (!operarioIncidenciaValidator.puntoKilometricoDentroDeLinea(request, linea)) {
            return Optional.empty();
        }

        Incidencia incidencia = new Incidencia();
        incidencia.setLinea(linea);
        incidencia.setVia(via);
        incidencia.setOperarioCreador(usuario);
        incidencia.setPuntoKilometrico(request.getPuntoKilometrico());
        incidencia.setTitulo(request.getTitulo().trim());
        incidencia.setDescripcion(request.getDescripcion().trim());
        try {
            incidencia.setUrgencia(UrgenciaIncidencia.valueOf(request.getUrgencia()));
        } catch (IllegalArgumentException exception) {
            return Optional.empty();
        }
        incidencia.setEstado(EstadoIncidencia.ABIERTA);

        return Optional.of(toResponse(incidenciaRepository.save(incidencia)));
    }

    public Optional<IncidenciaResponse> updateEstado(Long incidenciaId, UpdateIncidenciaEstadoRequest request) {
        Optional<Incidencia> incidenciaOptional = incidenciaRepository.findById(incidenciaId);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(request.getIdUsuario());

        if (incidenciaOptional.isEmpty() || usuarioOptional.isEmpty()) {
            return Optional.empty();
        }

        Usuario usuario = usuarioOptional.get();
        if (usuario.getRol() != Rol.ADMINISTRADOR) {
            return Optional.empty();
        }

        EstadoIncidencia nuevoEstado;
        try {
            nuevoEstado = EstadoIncidencia.valueOf(request.getEstado().trim());
        } catch (IllegalArgumentException exception) {
            return Optional.empty();
        }

        Incidencia incidencia = incidenciaOptional.get();
        EstadoIncidencia estadoAnterior = incidencia.getEstado();

        incidencia.setEstado(nuevoEstado);
        if (nuevoEstado == EstadoIncidencia.CERRADA) {
            incidencia.setFechaCierre(java.time.LocalDateTime.now());
        } else if (estadoAnterior == EstadoIncidencia.CERRADA) {
            incidencia.setFechaCierre(null);
        }

        Incidencia saved = incidenciaRepository.save(incidencia);
        historialIncidenciaService.createEntry(
            saved,
            usuario,
            nuevoEstado == EstadoIncidencia.CERRADA ? "CERRADA" : "CAMBIO_ESTADO",
            estadoAnterior.name(),
            saved.getEstado().name(),
            buildEstadoComment(estadoAnterior, saved.getEstado(), usuario)
        );

        return Optional.of(toResponse(saved));
    }

    public Optional<IncidenciaResponse> updateDescripcion(
        Long incidenciaId,
        UpdateIncidenciaDescripcionRequest request
    ) {
        Optional<Incidencia> incidenciaOptional = incidenciaRepository.findById(incidenciaId);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(request.getIdUsuario());

        if (incidenciaOptional.isEmpty() || usuarioOptional.isEmpty()) {
            return Optional.empty();
        }

        Usuario usuario = usuarioOptional.get();
        if (usuario.getRol() != Rol.ADMINISTRADOR) {
            return Optional.empty();
        }

        String descripcion = request.getDescripcion().trim();
        if (descripcion.isEmpty()) {
            return Optional.empty();
        }

        Incidencia incidencia = incidenciaOptional.get();
        incidencia.setDescripcion(descripcion);

        Incidencia saved = incidenciaRepository.save(incidencia);
        historialIncidenciaService.createEntry(
            saved,
            usuario,
            "ACTUALIZADA",
            saved.getEstado().name(),
            saved.getEstado().name(),
            "Descripcion de la incidencia modificada"
        );

        return Optional.of(toResponse(saved));
    }

    public Optional<IncidenciaResponse> updateUrgencia(Long incidenciaId, UpdateIncidenciaUrgenciaRequest request) {
        Optional<Incidencia> incidenciaOptional = incidenciaRepository.findById(incidenciaId);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(request.getIdUsuario());

        if (incidenciaOptional.isEmpty() || usuarioOptional.isEmpty()) {
            return Optional.empty();
        }

        Usuario usuario = usuarioOptional.get();
        if (usuario.getRol() != Rol.ADMINISTRADOR) {
            return Optional.empty();
        }

        UrgenciaIncidencia nuevaUrgencia;
        try {
            nuevaUrgencia = UrgenciaIncidencia.valueOf(request.getUrgencia().trim());
        } catch (IllegalArgumentException exception) {
            return Optional.empty();
        }

        Incidencia incidencia = incidenciaOptional.get();
        UrgenciaIncidencia urgenciaAnterior = incidencia.getUrgencia();
        incidencia.setUrgencia(nuevaUrgencia);

        Incidencia saved = incidenciaRepository.save(incidencia);
        historialIncidenciaService.createEntry(
            saved,
            usuario,
            "CAMBIO_URGENCIA",
            saved.getEstado().name(),
            saved.getEstado().name(),
            buildUrgenciaComment(urgenciaAnterior, nuevaUrgencia)
        );

        return Optional.of(toResponse(saved));
    }

    public Optional<IncidenciaResponse> cerrar(Long incidenciaId, CerrarIncidenciaRequest request) {
        Optional<Incidencia> incidenciaOptional = incidenciaRepository.findById(incidenciaId);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(request.getIdUsuario());

        if (incidenciaOptional.isEmpty() || usuarioOptional.isEmpty()) {
            return Optional.empty();
        }

        Usuario usuario = usuarioOptional.get();
        if (usuario.getRol() != Rol.ADMINISTRADOR) {
            return Optional.empty();
        }

        Incidencia incidencia = incidenciaOptional.get();
        EstadoIncidencia estadoAnterior = incidencia.getEstado();

        incidencia.setEstado(EstadoIncidencia.CERRADA);
        incidencia.setFechaCierre(java.time.LocalDateTime.now());

        Incidencia saved = incidenciaRepository.save(incidencia);
        historialIncidenciaService.createEntry(
            saved,
            usuario,
            "CERRADA",
            estadoAnterior.name(),
            saved.getEstado().name(),
            "Incidencia cerrada por el administrador " + usuario.getNombre() + " " + usuario.getApellidos()
        );

        return Optional.of(toResponse(saved));
    }

    private IncidenciaResponse toResponse(Incidencia incidencia) {
        return new IncidenciaResponse(
            incidencia.getIdIncidencia(),
            incidencia.getTitulo(),
            incidencia.getOperarioCreador().getIdUsuario(),
            incidencia.getOperarioCreador().getNombre() + " " + incidencia.getOperarioCreador().getApellidos(),
            incidencia.getLinea().getIdLinea(),
            incidencia.getLinea().getNombre(),
            incidencia.getVia().getIdVia(),
            incidencia.getVia().getNombre(),
            incidencia.getPuntoKilometrico(),
            incidencia.getDescripcion(),
            incidencia.getUrgencia().name(),
            incidencia.getEstado().name(),
            incidencia.getFechaCreacion(),
            incidencia.getFechaActualizacion(),
            incidencia.getFechaCierre()
        );
    }

    private String buildEstadoComment(
        EstadoIncidencia estadoAnterior,
        EstadoIncidencia estadoNuevo,
        Usuario usuario
    ) {
        if (estadoNuevo == EstadoIncidencia.CERRADA) {
            return "Incidencia cerrada por el administrador " + usuario.getNombre() + " " + usuario.getApellidos();
        }

        return "Estado cambiado de " + estadoAnterior.name() + " a " + estadoNuevo.name();
    }

    private String buildUrgenciaComment(UrgenciaIncidencia urgenciaAnterior, UrgenciaIncidencia urgenciaNueva) {
        return "Urgencia cambiada de " + urgenciaAnterior.name() + " a " + urgenciaNueva.name();
    }
}
