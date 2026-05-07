package com.railfix.dam.entity;

import com.railfix.dam.entity.enums.SentidoVia;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "vias")
public class Via {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_via")
    private Long idVia;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_linea", nullable = false)
    private Linea linea;

    @NotBlank
    @Column(name = "codigo_via", nullable = false)
    private String codigoVia;

    @NotBlank
    private String nombre;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SentidoVia sentido;

    @NotNull
    @Column(nullable = false)
    private Boolean activa = Boolean.TRUE;

    public Long getIdVia() {
        return idVia;
    }

    public void setIdVia(Long idVia) {
        this.idVia = idVia;
    }

    public Linea getLinea() {
        return linea;
    }

    public void setLinea(Linea linea) {
        this.linea = linea;
    }

    public String getCodigoVia() {
        return codigoVia;
    }

    public void setCodigoVia(String codigoVia) {
        this.codigoVia = codigoVia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public SentidoVia getSentido() {
        return sentido;
    }

    public void setSentido(SentidoVia sentido) {
        this.sentido = sentido;
    }

    public Boolean getActiva() {
        return activa;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }
}
