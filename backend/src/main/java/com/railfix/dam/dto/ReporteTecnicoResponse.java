package com.railfix.dam.dto;

import java.time.LocalDateTime;

public class ReporteTecnicoResponse {

    private Long idReporte;
    private Long incidenciaId;
    private String tituloIncidencia;
    private Long tecnicoId;
    private String tecnicoNombre;
    private String tecnicoApellidos;
    private String descripcionReporte;
    private String urgenciaSugerida;
    private Boolean requiereMasTecnicos;
    private Boolean incidenciaResuelta;
    private String estadoIncidencia;
    private String urgenciaActualIncidencia;
    private LocalDateTime fechaReporte;

    public ReporteTecnicoResponse(
        Long idReporte,
        Long incidenciaId,
        String tituloIncidencia,
        Long tecnicoId,
        String tecnicoNombre,
        String tecnicoApellidos,
        String descripcionReporte,
        String urgenciaSugerida,
        Boolean requiereMasTecnicos,
        Boolean incidenciaResuelta,
        String estadoIncidencia,
        String urgenciaActualIncidencia,
        LocalDateTime fechaReporte
    ) {
        this.idReporte = idReporte;
        this.incidenciaId = incidenciaId;
        this.tituloIncidencia = tituloIncidencia;
        this.tecnicoId = tecnicoId;
        this.tecnicoNombre = tecnicoNombre;
        this.tecnicoApellidos = tecnicoApellidos;
        this.descripcionReporte = descripcionReporte;
        this.urgenciaSugerida = urgenciaSugerida;
        this.requiereMasTecnicos = requiereMasTecnicos;
        this.incidenciaResuelta = incidenciaResuelta;
        this.estadoIncidencia = estadoIncidencia;
        this.urgenciaActualIncidencia = urgenciaActualIncidencia;
        this.fechaReporte = fechaReporte;
    }

    public Long getIdReporte() {
        return idReporte;
    }

    public Long getIncidenciaId() {
        return incidenciaId;
    }

    public String getTituloIncidencia() {
        return tituloIncidencia;
    }

    public Long getTecnicoId() {
        return tecnicoId;
    }

    public String getTecnicoNombre() {
        return tecnicoNombre;
    }

    public String getTecnicoApellidos() {
        return tecnicoApellidos;
    }

    public String getDescripcionReporte() {
        return descripcionReporte;
    }

    public String getUrgenciaSugerida() {
        return urgenciaSugerida;
    }

    public Boolean getRequiereMasTecnicos() {
        return requiereMasTecnicos;
    }

    public Boolean getIncidenciaResuelta() {
        return incidenciaResuelta;
    }

    public String getEstadoIncidencia() {
        return estadoIncidencia;
    }

    public String getUrgenciaActualIncidencia() {
        return urgenciaActualIncidencia;
    }

    public LocalDateTime getFechaReporte() {
        return fechaReporte;
    }
}
