package com.railfix.dam.service;

import com.railfix.dam.dto.LineaResponse;
import com.railfix.dam.entity.Linea;
import com.railfix.dam.repository.LineaRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class LineaService {

    private final LineaRepository lineaRepository;

    public LineaService(LineaRepository lineaRepository) {
        this.lineaRepository = lineaRepository;
    }

    public List<Linea> findAll() {
        return lineaRepository.findAll();
    }

    public List<LineaResponse> findAllResponses() {
        return lineaRepository.findAll().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Optional<Linea> findById(Long id) {
        return lineaRepository.findById(id);
    }

    private LineaResponse toResponse(Linea linea) {
        return new LineaResponse(
            linea.getIdLinea(),
            linea.getCodigoLinea(),
            linea.getNombre(),
            linea.getOrigen(),
            linea.getDestino(),
            linea.getPkInicial(),
            linea.getPkFinal()
        );
    }
}
