package com.railfix.dam.controller;

import com.railfix.dam.dto.CerrarIncidenciaRequest;
import com.railfix.dam.dto.CreateIncidenciaRequest;
import com.railfix.dam.dto.IncidenciaResponse;
import com.railfix.dam.dto.UpdateIncidenciaDescripcionRequest;
import com.railfix.dam.dto.UpdateIncidenciaEstadoRequest;
import com.railfix.dam.dto.UpdateIncidenciaUrgenciaRequest;
import com.railfix.dam.service.IncidenciaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/incidencias")
public class IncidenciaController {

    private final IncidenciaService incidenciaService;

    public IncidenciaController(IncidenciaService incidenciaService) {
        this.incidenciaService = incidenciaService;
    }

    @GetMapping
    public List<IncidenciaResponse> getAll() {
        return incidenciaService.findAllResponses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidenciaResponse> getById(@PathVariable Long id) {
        return incidenciaService.findResponseById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<IncidenciaResponse> create(@Valid @RequestBody CreateIncidenciaRequest request) {
        return incidenciaService.create(request)
            .map(response -> ResponseEntity.status(201).body(response))
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<IncidenciaResponse> updateEstado(
        @PathVariable Long id,
        @Valid @RequestBody UpdateIncidenciaEstadoRequest request
    ) {
        return incidenciaService.updateEstado(id, request)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PatchMapping("/{id}/descripcion")
    public ResponseEntity<IncidenciaResponse> updateDescripcion(
        @PathVariable Long id,
        @Valid @RequestBody UpdateIncidenciaDescripcionRequest request
    ) {
        return incidenciaService.updateDescripcion(id, request)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PatchMapping("/{id}/urgencia")
    public ResponseEntity<IncidenciaResponse> updateUrgencia(
        @PathVariable Long id,
        @Valid @RequestBody UpdateIncidenciaUrgenciaRequest request
    ) {
        return incidenciaService.updateUrgencia(id, request)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PatchMapping("/{id}/cerrar")
    public ResponseEntity<IncidenciaResponse> cerrar(
        @PathVariable Long id,
        @Valid @RequestBody CerrarIncidenciaRequest request
    ) {
        return incidenciaService.cerrar(id, request)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
