package com.railfix.dam.service;

import com.railfix.dam.dto.ViaResponse;
import com.railfix.dam.entity.Via;
import com.railfix.dam.repository.ViaRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ViaService {

    private final ViaRepository viaRepository;

    public ViaService(ViaRepository viaRepository) {
        this.viaRepository = viaRepository;
    }

    public List<Via> findAll() {
        return viaRepository.findAll();
    }

    public List<ViaResponse> findByLineaId(Long lineaId) {
        return viaRepository.findByLinea_IdLinea(lineaId).stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Optional<Via> findById(Long id) {
        return viaRepository.findById(id);
    }

    private ViaResponse toResponse(Via via) {
        return new ViaResponse(
            via.getIdVia(),
            via.getLinea().getIdLinea(),
            via.getCodigoVia(),
            via.getNombre(),
            via.getSentido().name(),
            via.getActiva()
        );
    }
}
