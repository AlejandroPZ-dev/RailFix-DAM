package com.railfix.dam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class CreateIncidenciaRequest {

    @NotNull
    private Long lineaId;

    @NotNull
    private Long viaId;

    @NotNull
    private Long operarioCreadorId;

    @NotNull
    private BigDecimal puntoKilometrico;

    @NotBlank
    private String titulo;

    @NotBlank
    private String descripcion;

    @NotBlank
    private String urgencia;

    private BigDecimal latitud;

    private BigDecimal longitud;

    private BigDecimal precisionGpsMetros;

    public Long getLineaId() {
        return lineaId;
    }

    public void setLineaId(Long lineaId) {
        this.lineaId = lineaId;
    }

    public Long getViaId() {
        return viaId;
    }

    public void setViaId(Long viaId) {
        this.viaId = viaId;
    }

    public Long getOperarioCreadorId() {
        return operarioCreadorId;
    }

    public void setOperarioCreadorId(Long operarioCreadorId) {
        this.operarioCreadorId = operarioCreadorId;
    }

    public BigDecimal getPuntoKilometrico() {
        return puntoKilometrico;
    }

    public void setPuntoKilometrico(BigDecimal puntoKilometrico) {
        this.puntoKilometrico = puntoKilometrico;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUrgencia() {
        return urgencia;
    }

    public void setUrgencia(String urgencia) {
        this.urgencia = urgencia;
    }

    public BigDecimal getLatitud() {
        return latitud;
    }

    public void setLatitud(BigDecimal latitud) {
        this.latitud = latitud;
    }

    public BigDecimal getLongitud() {
        return longitud;
    }

    public void setLongitud(BigDecimal longitud) {
        this.longitud = longitud;
    }

    public BigDecimal getPrecisionGpsMetros() {
        return precisionGpsMetros;
    }

    public void setPrecisionGpsMetros(BigDecimal precisionGpsMetros) {
        this.precisionGpsMetros = precisionGpsMetros;
    }
}
