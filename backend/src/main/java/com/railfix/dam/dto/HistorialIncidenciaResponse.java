package com.railfix.dam.dto;

import java.time.LocalDateTime;

public class HistorialIncidenciaResponse {

    private Long idHistorial;
    private Long usuarioId;
    private String usuarioNombre;
    private String accion;
    private String estadoAnterior;
    private String estadoNuevo;
    private String comentario;
    private LocalDateTime fechaAccion;

    public HistorialIncidenciaResponse(
        Long idHistorial,
        Long usuarioId,
        String usuarioNombre,
        String accion,
        String estadoAnterior,
        String estadoNuevo,
        String comentario,
        LocalDateTime fechaAccion
    ) {
        this.idHistorial = idHistorial;
        this.usuarioId = usuarioId;
        this.usuarioNombre = usuarioNombre;
        this.accion = accion;
        this.estadoAnterior = estadoAnterior;
        this.estadoNuevo = estadoNuevo;
        this.comentario = comentario;
        this.fechaAccion = fechaAccion;
    }

    public Long getIdHistorial() {
        return idHistorial;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public String getAccion() {
        return accion;
    }

    public String getEstadoAnterior() {
        return estadoAnterior;
    }

    public String getEstadoNuevo() {
        return estadoNuevo;
    }

    public String getComentario() {
        return comentario;
    }

    public LocalDateTime getFechaAccion() {
        return fechaAccion;
    }
}
