package com.railfix.dam.dto;

import java.math.BigDecimal;

public class LineaResponse {

    private Long id;
    private String codigoLinea;
    private String nombre;
    private String origen;
    private String destino;
    private BigDecimal pkInicial;
    private BigDecimal pkFinal;

    public LineaResponse(
        Long id,
        String codigoLinea,
        String nombre,
        String origen,
        String destino,
        BigDecimal pkInicial,
        BigDecimal pkFinal
    ) {
        this.id = id;
        this.codigoLinea = codigoLinea;
        this.nombre = nombre;
        this.origen = origen;
        this.destino = destino;
        this.pkInicial = pkInicial;
        this.pkFinal = pkFinal;
    }

    public Long getId() {
        return id;
    }

    public String getCodigoLinea() {
        return codigoLinea;
    }

    public String getNombre() {
        return nombre;
    }

    public String getOrigen() {
        return origen;
    }

    public String getDestino() {
        return destino;
    }

    public BigDecimal getPkInicial() {
        return pkInicial;
    }

    public BigDecimal getPkFinal() {
        return pkFinal;
    }
}

