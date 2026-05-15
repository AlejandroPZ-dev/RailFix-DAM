package com.railfix.dam.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class IncidenciaResponse {

    private Long id;
    private String titulo;
    private Long operarioCreadorId;
    private String operarioCreadorNombre;
    private Long lineaId;
    private String lineaNombre;
    private Long viaId;
    private String viaNombre;
    private BigDecimal puntoKilometrico;
    private String descripcion;
    private String urgencia;
    private String estado;
    private BigDecimal latitud;
    private BigDecimal longitud;
    private BigDecimal precisionGpsMetros;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private LocalDateTime fechaCierre;

    public IncidenciaResponse(
        Long id,
        String titulo,
        Long operarioCreadorId,
        String operarioCreadorNombre,
        Long lineaId,
        String lineaNombre,
        Long viaId,
        String viaNombre,
        BigDecimal puntoKilometrico,
        String descripcion,
        String urgencia,
        String estado,
        BigDecimal latitud,
        BigDecimal longitud,
        BigDecimal precisionGpsMetros,
        LocalDateTime fechaCreacion,
        LocalDateTime fechaActualizacion,
        LocalDateTime fechaCierre
    ) {
        this.id = id;
        this.titulo = titulo;
        this.operarioCreadorId = operarioCreadorId;
        this.operarioCreadorNombre = operarioCreadorNombre;
        this.lineaId = lineaId;
        this.lineaNombre = lineaNombre;
        this.viaId = viaId;
        this.viaNombre = viaNombre;
        this.puntoKilometrico = puntoKilometrico;
        this.descripcion = descripcion;
        this.urgencia = urgencia;
        this.estado = estado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.precisionGpsMetros = precisionGpsMetros;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.fechaCierre = fechaCierre;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Long getOperarioCreadorId() {
        return operarioCreadorId;
    }

    public String getOperarioCreadorNombre() {
        return operarioCreadorNombre;
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

    public String getDescripcion() {
        return descripcion;
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
}
