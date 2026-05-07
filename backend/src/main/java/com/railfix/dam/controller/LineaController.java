package com.railfix.dam.controller;

import com.railfix.dam.dto.LineaResponse;
import com.railfix.dam.service.LineaService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lineas")
public class LineaController {

    private final LineaService lineaService;

    public LineaController(LineaService lineaService) {
        this.lineaService = lineaService;
    }

    @GetMapping
    public List<LineaResponse> getAll() {
        return lineaService.findAllResponses();
    }
}
