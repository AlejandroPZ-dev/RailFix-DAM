package com.railfix.dam.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TecnicoIncidenciaDetailResponse {

    private Long id;
    private String titulo;
    private String descripcion;
    private Long lineaId;
    private String lineaNombre;
    private Long viaId;
    private String viaNombre;
    private BigDecimal puntoKilometrico;
    private String urgencia;
    private String estado;
    private BigDecimal latitud;
    private BigDecimal longitud;
    private BigDecimal precisionGpsMetros;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private LocalDateTime fechaCierre;
    private String estadoAsignacion;
    private LocalDateTime fechaAsignacion;

    public TecnicoIncidenciaDetailResponse(
        Long id,
        String titulo,
        String descripcion,
        Long lineaId,
        String lineaNombre,
        Long viaId,
        String viaNombre,
        BigDecimal puntoKilometrico,
        String urgencia,
        String estado,
        BigDecimal latitud,
        BigDecimal longitud,
        BigDecimal precisionGpsMetros,
        LocalDateTime fechaCreacion,
        LocalDateTime fechaActualizacion,
        LocalDateTime fechaCierre,
        String estadoAsignacion,
        LocalDateTime fechaAsignacion
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.lineaId = lineaId;
        this.lineaNombre = lineaNombre;
        this.viaId = viaId;
        this.viaNombre = viaNombre;
        this.puntoKilometrico = puntoKilometrico;
        this.urgencia = urgencia;
        this.estado = estado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.precisionGpsMetros = precisionGpsMetros;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.fechaCierre = fechaCierre;
        this.estadoAsignacion = estadoAsignacion;
        this.fechaAsignacion = fechaAsignacion;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
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

    public BigDecimal getLatitud() {
        return latitud;
    }

    public BigDecimal getLongitud() {
        return longitud;
    }

    public BigDecimal getPrecisionGpsMetros() {
        return precisionGpsMetros;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public LocalDateTime getFechaCierre() {
        return fechaCierre;
    }

    public String getEstadoAsignacion() {
        return estadoAsignacion;
    }

    public LocalDateTime getFechaAsignacion() {
        return fechaAsignacion;
    }
}
