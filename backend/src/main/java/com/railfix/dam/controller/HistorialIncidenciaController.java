package com.railfix.dam.controller;

import com.railfix.dam.dto.HistorialIncidenciaResponse;
import com.railfix.dam.service.HistorialIncidenciaService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class HistorialIncidenciaController {

    private final HistorialIncidenciaService historialIncidenciaService;

    public HistorialIncidenciaController(HistorialIncidenciaService historialIncidenciaService) {
        this.historialIncidenciaService = historialIncidenciaService;
    }

    @GetMapping("/incidencias/{id}/historial")
    public List<HistorialIncidenciaResponse> getByIncidencia(@PathVariable Long id) {
        return historialIncidenciaService.findByIncidenciaId(id);
    }
}

