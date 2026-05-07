package com.railfix.dam.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TecnicoIncidenciaResponse {

    private Long id;
    private String titulo;
    private Long lineaId;
    private String lineaNombre;
    private Long viaId;
    private String viaNombre;
    private BigDecimal puntoKilometrico;
    private String urgencia;
    private String estado;
    private String estadoAsignacion;
    private LocalDateTime fechaAsignacion;

    public TecnicoIncidenciaResponse(
        Long id,
        String titulo,
        Long lineaId,
        String lineaNombre,
        Long viaId,
        String viaNombre,
        BigDecimal puntoKilometrico,
        String urgencia,
        String estado,
        String estadoAsignacion,
        LocalDateTime fechaAsignacion
    ) {
        this.id = id;
        this.titulo = titulo;
        this.lineaId = lineaId;
        this.lineaNombre = lineaNombre;
        this.viaId = viaId;
        this.viaNombre = viaNombre;
        this.puntoKilometrico = puntoKilometrico;
        this.urgencia = urgencia;
        this.estado = estado;
        this.estadoAsignacion = estadoAsignacion;
        this.fechaAsignacion = fechaAsignacion;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Long getLineaId() {
        return lineaId;
    }

    public String getLineaNombre() {
        return lineaNombre;
    }

    public Long getViaId() {
        return viaId;
    }

    public String getViaNombre() {
        return viaNombre;
    }

    public BigDecimal getPuntoKilometrico() {
        return puntoKilometrico;
    }

    public String getUrgencia() {
        return urgencia;
    }

    public String getEstado() {
        return estado;
    }

    public String getEstadoAsignacion() {
        return estadoAsignacion;
    }

    public LocalDateTime getFechaAsignacion() {
        return fechaAsignacion;
    }
}

