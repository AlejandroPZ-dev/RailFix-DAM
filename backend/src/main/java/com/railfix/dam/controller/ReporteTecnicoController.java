package com.railfix.dam.controller;

import com.railfix.dam.dto.ReporteTecnicoRequest;
import com.railfix.dam.dto.ReporteTecnicoResponse;
import com.railfix.dam.service.ReporteTecnicoService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping
public class ReporteTecnicoController {

    private final ReporteTecnicoService reporteTecnicoService;

    public ReporteTecnicoController(ReporteTecnicoService reporteTecnicoService) {
        this.reporteTecnicoService = reporteTecnicoService;
    }

    @GetMapping("/reportes")
    public List<ReporteTecnicoResponse> getAll(
        @RequestParam(required = false) Long idIncidencia,
        @RequestParam(required = false) Long idTecnico,
        @RequestParam(required = false) String estadoIncidencia,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaDesde,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaHasta,
        @RequestParam(required = false) Boolean incidenciaResuelta
    ) {
        if (fechaDesde != null && fechaHasta != null && fechaDesde.isAfter(fechaHasta)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "fechaDesde no puede ser posterior a fechaHasta");
        }

        try {
            return reporteTecnicoService.findAllForAdmin(
                idIncidencia,
                idTecnico,
                estadoIncidencia,
                fechaDesde,
                fechaHasta,
                incidenciaResuelta
            );
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PostMapping("/incidencias/{id}/reportes")
    public ResponseEntity<ReporteTecnicoResponse> create(
        @PathVariable Long id,
        @Valid @RequestBody ReporteTecnicoRequest request
    ) {
        return reporteTecnicoService.create(id, request)
            .map(response -> ResponseEntity.status(201).body(response))
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/incidencias/{id}/reportes")
    public List<ReporteTecnicoResponse> getByIncidencia(@PathVariable Long id) {
        return reporteTecnicoService.findByIncidenciaId(id);
    }

    @GetMapping("/tecnicos/{idTecnico}/reportes")
    public List<ReporteTecnicoResponse> getByTecnico(@PathVariable Long idTecnico) {
        return reporteTecnicoService.findByTecnicoId(idTecnico);
    }

    @GetMapping("/tecnicos/{idTecnico}/incidencias/{idIncidencia}/reportes")
    public ResponseEntity<List<ReporteTecnicoResponse>> getByTecnicoAndIncidencia(
        @PathVariable Long idTecnico,
        @PathVariable Long idIncidencia
    ) {
        return reporteTecnicoService.findByTecnicoIdAndIncidenciaId(idTecnico, idIncidencia)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(403).build());
    }
}
