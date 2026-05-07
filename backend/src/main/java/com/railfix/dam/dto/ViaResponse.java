package com.railfix.dam.dto;

public class ViaResponse {

    private Long id;
    private Long lineaId;
    private String codigoVia;
    private String nombre;
    private String sentido;
    private Boolean activa;

    public ViaResponse(
        Long id,
        Long lineaId,
        String codigoVia,
        String nombre,
        String sentido,
        Boolean activa
    ) {
        this.id = id;
        this.lineaId = lineaId;
        this.codigoVia = codigoVia;
        this.nombre = nombre;
        this.sentido = sentido;
        this.activa = activa;
    }

    public Long getId() {
        return id;
    }

    public Long getLineaId() {
        return lineaId;
    }

    public String getCodigoVia() {
        return codigoVia;
    }

    public String getNombre() {
        return nombre;
    }

    public String getSentido() {
        return sentido;
    }

    public Boolean getActiva() {
        return activa;
    }
}

