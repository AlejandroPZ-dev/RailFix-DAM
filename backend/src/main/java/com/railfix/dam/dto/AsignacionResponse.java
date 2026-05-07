package com.railfix.dam.dto;

import java.time.LocalDateTime;

public class AsignacionResponse {

    private Long idAsignacion;
    private Long tecnicoId;
    private String tecnicoNombre;
    private Long administradorId;
    private String estadoAsignacion;
    private LocalDateTime fechaAsignacion;

    public AsignacionResponse(
        Long idAsignacion,
        Long tecnicoId,
        String tecnicoNombre,
        Long administradorId,
        String estadoAsignacion,
        LocalDateTime fechaAsignacion
    ) {
        this.idAsignacion = idAsignacion;
        this.tecnicoId = tecnicoId;
        this.tecnicoNombre = tecnicoNombre;
        this.administradorId = administradorId;
        this.estadoAsignacion = estadoAsignacion;
        this.fechaAsignacion = fechaAsignacion;
    }

    public Long getIdAsignacion() {
        return idAsignacion;
    }

    public Long getTecnicoId() {
        return tecnicoId;
    }

    public String getTecnicoNombre() {
        return tecnicoNombre;
    }

    public Long getAdministradorId() {
        return administradorId;
    }

    public String getEstadoAsignacion() {
        return estadoAsignacion;
    }

    public LocalDateTime getFechaAsignacion() {
        return fechaAsignacion;
    }
}

