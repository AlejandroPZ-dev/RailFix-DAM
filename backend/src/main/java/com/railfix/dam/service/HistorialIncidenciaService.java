package com.railfix.dam.service;

import com.railfix.dam.dto.HistorialIncidenciaResponse;
import com.railfix.dam.entity.HistorialIncidencia;
import com.railfix.dam.entity.Incidencia;
import com.railfix.dam.entity.Usuario;
import com.railfix.dam.repository.HistorialIncidenciaRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class HistorialIncidenciaService {

    private final HistorialIncidenciaRepository historialIncidenciaRepository;

    public HistorialIncidenciaService(HistorialIncidenciaRepository historialIncidenciaRepository) {
        this.historialIncidenciaRepository = historialIncidenciaRepository;
    }

    public void createEntry(
        Incidencia incidencia,
        Usuario usuario,
        String accion,
        String estadoAnterior,
        String estadoNuevo,
        String comentario
    ) {
        HistorialIncidencia historial = new HistorialIncidencia();
        historial.setIncidencia(incidencia);
        historial.setUsuario(usuario);
        historial.setAccion(accion);
        historial.setEstadoAnterior(estadoAnterior);
        historial.setEstadoNuevo(estadoNuevo);
        historial.setComentario(comentario);

        historialIncidenciaRepository.save(historial);
    }

    public List<HistorialIncidenciaResponse> findByIncidenciaId(Long incidenciaId) {
        return historialIncidenciaRepository.findByIncidenciaIdIncidenciaOrderByFechaAccionDesc(incidenciaId)
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    private HistorialIncidenciaResponse toResponse(HistorialIncidencia historial) {
        return new HistorialIncidenciaResponse(
            historial.getIdHistorial(),
            historial.getUsuario().getIdUsuario(),
            historial.getUsuario().getNombre() + " " + historial.getUsuario().getApellidos(),
            historial.getAccion(),
            historial.getEstadoAnterior(),
            historial.getEstadoNuevo(),
            historial.getComentario(),
            historial.getFechaAccion()
        );
    }
}

