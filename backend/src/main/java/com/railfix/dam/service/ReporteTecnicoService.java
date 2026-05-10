package com.railfix.dam.service;

import com.railfix.dam.dto.ReporteTecnicoRequest;
import com.railfix.dam.dto.ReporteTecnicoResponse;
import com.railfix.dam.entity.AsignacionIncidencia;
import com.railfix.dam.entity.Incidencia;
import com.railfix.dam.entity.ReporteTecnico;
import com.railfix.dam.entity.Usuario;
import com.railfix.dam.entity.enums.EstadoAsignacion;
import com.railfix.dam.entity.enums.EstadoIncidencia;
import com.railfix.dam.entity.enums.Rol;
import com.railfix.dam.entity.enums.UrgenciaIncidencia;
import com.railfix.dam.repository.IncidenciaRepository;
import com.railfix.dam.repository.ReporteTecnicoRepository;
import com.railfix.dam.repository.UsuarioRepository;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ReporteTecnicoService {

    private final ReporteTecnicoRepository reporteTecnicoRepository;
    private final IncidenciaRepository incidenciaRepository;
    private final UsuarioRepository usuarioRepository;
    private final AsignacionIncidenciaService asignacionIncidenciaService;
    private final HistorialIncidenciaService historialIncidenciaService;

    public ReporteTecnicoService(
        ReporteTecnicoRepository reporteTecnicoRepository,
        IncidenciaRepository incidenciaRepository,
        UsuarioRepository usuarioRepository,
        AsignacionIncidenciaService asignacionIncidenciaService,
        HistorialIncidenciaService historialIncidenciaService
    ) {
        this.reporteTecnicoRepository = reporteTecnicoRepository;
        this.incidenciaRepository = incidenciaRepository;
        this.usuarioRepository = usuarioRepository;
        this.asignacionIncidenciaService = asignacionIncidenciaService;
        this.historialIncidenciaService = historialIncidenciaService;
    }

    public Optional<ReporteTecnicoResponse> create(Long incidenciaId, ReporteTecnicoRequest request) {
        Optional<Incidencia> incidenciaOptional = incidenciaRepository.findById(incidenciaId);
        Optional<Usuario> tecnicoOptional = usuarioRepository.findById(request.getIdTecnico());
        Optional<AsignacionIncidencia> asignacionOptional = asignacionIncidenciaService.findByIncidenciaAndTecnico(
            incidenciaId,
            request.getIdTecnico()
        );

        if (incidenciaOptional.isEmpty() || tecnicoOptional.isEmpty() || asignacionOptional.isEmpty()) {
            return Optional.empty();
        }

        Incidencia incidencia = incidenciaOptional.get();
        Usuario tecnico = tecnicoOptional.get();
        AsignacionIncidencia asignacion = asignacionOptional.get();

        if (!tecnico.getActivo() || tecnico.getRol() != Rol.TECNICO) {
            return Optional.empty();
        }

        if (request.getDescripcionReporte().trim().length() < 10) {
            return Optional.empty();
        }

        ReporteTecnico reporte = new ReporteTecnico();
        reporte.setIncidencia(incidencia);
        reporte.setTecnico(tecnico);
        reporte.setDescripcionReporte(request.getDescripcionReporte().trim());
        reporte.setRequiereMasTecnicos(request.getRequiereMasTecnicos());
        reporte.setIncidenciaResuelta(request.getIncidenciaResuelta());

        if (request.getUrgenciaSugerida() != null && !request.getUrgenciaSugerida().isBlank()) {
            try {
                reporte.setUrgenciaSugerida(UrgenciaIncidencia.valueOf(request.getUrgenciaSugerida()));
            } catch (IllegalArgumentException exception) {
                return Optional.empty();
            }
        }

        if (asignacion.getEstadoAsignacion() == EstadoAsignacion.ASIGNADA) {
            asignacion.setEstadoAsignacion(EstadoAsignacion.EN_CURSO);
            asignacionIncidenciaService.save(asignacion);
        }

        ReporteTecnico saved = reporteTecnicoRepository.save(reporte);

        historialIncidenciaService.createEntry(
            incidencia,
            tecnico,
            "REPORTE_TECNICO",
            incidencia.getEstado().name(),
            incidencia.getEstado().name(),
            "Reporte técnico recibido"
        );

        return Optional.of(toResponse(saved));
    }

    public List<ReporteTecnicoResponse> findAllForAdmin() {
        return reporteTecnicoRepository.findAllByOrderByFechaReporteDesc().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public List<ReporteTecnicoResponse> findAllForAdmin(
        Long idIncidencia,
        Long idTecnico,
        String estadoIncidencia,
        LocalDate fechaDesde,
        LocalDate fechaHasta,
        Boolean incidenciaResuelta
    ) {
        EstadoIncidencia estadoFilter = null;
        if (estadoIncidencia != null && !estadoIncidencia.isBlank()) {
            try {
                estadoFilter = EstadoIncidencia.valueOf(estadoIncidencia.trim());
            } catch (IllegalArgumentException exception) {
                throw new IllegalArgumentException("Estado de incidencia no valido");
            }
        }

        final EstadoIncidencia finalEstadoFilter = estadoFilter;
        final LocalDateTime fechaDesdeDateTime = fechaDesde != null ? fechaDesde.atStartOfDay() : null;
        final LocalDateTime fechaHastaDateTime = fechaHasta != null ? fechaHasta.atTime(LocalTime.MAX) : null;

        return reporteTecnicoRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (idIncidencia != null) {
                predicates.add(criteriaBuilder.equal(root.get("incidencia").get("idIncidencia"), idIncidencia));
            }

            if (idTecnico != null) {
                predicates.add(criteriaBuilder.equal(root.get("tecnico").get("idUsuario"), idTecnico));
            }

            if (finalEstadoFilter != null) {
                predicates.add(criteriaBuilder.equal(root.get("incidencia").get("estado"), finalEstadoFilter));
            }

            if (fechaDesdeDateTime != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("fechaReporte"), fechaDesdeDateTime));
            }

            if (fechaHastaDateTime != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("fechaReporte"), fechaHastaDateTime));
            }

            if (incidenciaResuelta != null) {
                predicates.add(criteriaBuilder.equal(root.get("incidenciaResuelta"), incidenciaResuelta));
            }

            query.orderBy(criteriaBuilder.desc(root.get("fechaReporte")));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ReporteTecnicoResponse> findByIncidenciaId(Long incidenciaId) {
        return reporteTecnicoRepository.findByIncidenciaIdIncidencia(incidenciaId).stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public List<ReporteTecnicoResponse> findByTecnicoId(Long tecnicoId) {
        return reporteTecnicoRepository.findByTecnicoIdUsuario(tecnicoId).stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Optional<List<ReporteTecnicoResponse>> findByTecnicoIdAndIncidenciaId(Long tecnicoId, Long incidenciaId) {
        Optional<Usuario> tecnicoOptional = usuarioRepository.findById(tecnicoId);
        Optional<AsignacionIncidencia> asignacionOptional = asignacionIncidenciaService.findByIncidenciaAndTecnico(
            incidenciaId,
            tecnicoId
        );

        if (tecnicoOptional.isEmpty() || asignacionOptional.isEmpty()) {
            return Optional.empty();
        }

        Usuario tecnico = tecnicoOptional.get();
        if (!tecnico.getActivo() || tecnico.getRol() != Rol.TECNICO) {
            return Optional.empty();
        }

        return Optional.of(
            reporteTecnicoRepository.findByTecnicoIdUsuarioAndIncidenciaIdIncidenciaOrderByFechaReporteDesc(
                tecnicoId,
                incidenciaId
            ).stream().map(this::toResponse).collect(Collectors.toList())
        );
    }

    private ReporteTecnicoResponse toResponse(ReporteTecnico reporte) {
        return new ReporteTecnicoResponse(
            reporte.getIdReporte(),
            reporte.getIncidencia().getIdIncidencia(),
            reporte.getIncidencia().getTitulo(),
            reporte.getTecnico().getIdUsuario(),
            reporte.getTecnico().getNombre(),
            reporte.getTecnico().getApellidos(),
            reporte.getDescripcionReporte(),
            reporte.getUrgenciaSugerida() != null ? reporte.getUrgenciaSugerida().name() : null,
            reporte.getRequiereMasTecnicos(),
            reporte.getIncidenciaResuelta(),
            reporte.getIncidencia().getEstado().name(),
            reporte.getIncidencia().getUrgencia().name(),
            reporte.getFechaReporte()
        );
    }
}
