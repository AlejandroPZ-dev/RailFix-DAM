package com.railfix.dam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "lineas")
public class Linea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_linea")
    private Long idLinea;

    @NotBlank
    @Column(name = "codigo_linea", unique = true, nullable = false)
    private String codigoLinea;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String nombre;

    @NotBlank
    private String origen;

    @NotBlank
    private String destino;

    @NotNull
    @Column(name = "pk_inicial", nullable = false)
    private BigDecimal pkInicial;

    @NotNull
    @Column(name = "pk_final", nullable = false)
    private BigDecimal pkFinal;

    public Long getIdLinea() {
        return idLinea;
    }

    public void setIdLinea(Long idLinea) {
        this.idLinea = idLinea;
    }

    public String getCodigoLinea() {
        return codigoLinea;
    }

    public void setCodigoLinea(String codigoLinea) {
        this.codigoLinea = codigoLinea;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public BigDecimal getPkInicial() {
        return pkInicial;
    }

    public void setPkInicial(BigDecimal pkInicial) {
        this.pkInicial = pkInicial;
    }

    public BigDecimal getPkFinal() {
        return pkFinal;
    }

    public void setPkFinal(BigDecimal pkFinal) {
        this.pkFinal = pkFinal;
    }
}

