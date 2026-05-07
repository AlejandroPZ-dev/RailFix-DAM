package com.railfix.dam.controller;

import com.railfix.dam.dto.AsignacionRequest;
import com.railfix.dam.dto.AsignacionResponse;
import com.railfix.dam.dto.TecnicoIncidenciaDetailResponse;
import com.railfix.dam.service.AsignacionIncidenciaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class AsignacionIncidenciaController {

    private final AsignacionIncidenciaService asignacionIncidenciaService;

    public AsignacionIncidenciaController(AsignacionIncidenciaService asignacionIncidenciaService) {
        this.asignacionIncidenciaService = asignacionIncidenciaService;
    }

    @GetMapping("/incidencias/{id}/asignaciones")
    public List<AsignacionResponse> getByIncidencia(@PathVariable Long id) {
        return asignacionIncidenciaService.findByIncidenciaId(id);
    }

    @PostMapping("/incidencias/{id}/asignaciones")
    public ResponseEntity<List<AsignacionResponse>> create(
        @PathVariable Long id,
        @Valid @RequestBody AsignacionRequest request
    ) {
        return asignacionIncidenciaService.create(id, request)
            .map(response -> ResponseEntity.status(201).body(response))
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/incidencias/{id}/asignaciones/{idAsignacion}")
    public ResponseEntity<Void> delete(
        @PathVariable Long id,
        @PathVariable Long idAsignacion
    ) {
        if (asignacionIncidenciaService.delete(id, idAsignacion)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/tecnicos/{idTecnico}/incidencias")
    public List<com.railfix.dam.dto.TecnicoIncidenciaResponse> getIncidenciasByTecnico(@PathVariable Long idTecnico) {
        return asignacionIncidenciaService.findIncidenciasByTecnicoId(idTecnico);
    }

    @GetMapping("/tecnicos/{idTecnico}/incidencias/{idIncidencia}")
    public ResponseEntity<TecnicoIncidenciaDetailResponse> getIncidenciaDetailByTecnico(
        @PathVariable Long idTecnico,
        @PathVariable Long idIncidencia
    ) {
        return asignacionIncidenciaService.findDetailByTecnicoId(idTecnico, idIncidencia)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }
}
