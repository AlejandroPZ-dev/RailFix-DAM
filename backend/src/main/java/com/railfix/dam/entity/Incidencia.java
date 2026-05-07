package com.railfix.dam.entity;

import com.railfix.dam.entity.enums.EstadoIncidencia;
import com.railfix.dam.entity.enums.UrgenciaIncidencia;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidencias")
public class Incidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incidencia")
    private Long idIncidencia;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_linea", nullable = false)
    private Linea linea;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_via", nullable = false)
    private Via via;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_operario_creador", nullable = false)
    private Usuario operarioCreador;

    @NotBlank
    @Column(nullable = false)
    private String titulo;

    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @NotNull
    @Column(name = "punto_kilometrico", nullable = false)
    private BigDecimal puntoKilometrico;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UrgenciaIncidencia urgencia;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoIncidencia estado = EstadoIncidencia.ABIERTA;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion", nullable = false)
    private LocalDateTime fechaActualizacion;

    @Column(name = "fecha_cierre")
    private LocalDateTime fechaCierre;

    private BigDecimal latitud;

    private BigDecimal longitud;

    @Column(name = "precision_gps_metros")
    private BigDecimal precisionGpsMetros;

    @PrePersist
    void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.fechaCreacion = now;
        this.fechaActualizacion = now;
    }

    @PreUpdate
    void onUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Long getIdIncidencia() {
        return idIncidencia;
    }

    public void setIdIncidencia(Long idIncidencia) {
        this.idIncidencia = idIncidencia;
    }

    public Linea getLinea() {
        return linea;
    }

    public void setLinea(Linea linea) {
        this.linea = linea;
    }

    public Via getVia() {
        return via;
    }

    public void setVia(Via via) {
        this.via = via;
    }

    public Usuario getOperarioCreador() {
        return operarioCreador;
    }

    public void setOperarioCreador(Usuario operarioCreador) {
        this.operarioCreador = operarioCreador;
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

    public BigDecimal getPuntoKilometrico() {
        return puntoKilometrico;
    }

    public void setPuntoKilometrico(BigDecimal puntoKilometrico) {
        this.puntoKilometrico = puntoKilometrico;
    }

    public UrgenciaIncidencia getUrgencia() {
        return urgencia;
    }

    public void setUrgencia(UrgenciaIncidencia urgencia) {
        this.urgencia = urgencia;
    }

    public EstadoIncidencia getEstado() {
        return estado;
    }

    public void setEstado(EstadoIncidencia estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public LocalDateTime getFechaCierre() {
        return fechaCierre;
    }

    public void setFechaCierre(LocalDateTime fechaCierre) {
        this.fechaCierre = fechaCierre;
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
