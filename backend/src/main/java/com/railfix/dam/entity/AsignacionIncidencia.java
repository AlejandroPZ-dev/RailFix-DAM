package com.railfix.dam.entity;

import com.railfix.dam.entity.enums.EstadoAsignacion;
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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "asignaciones_incidencia",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_incidencia", "id_tecnico"})
    }
)
public class AsignacionIncidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asignacion")
    private Long idAsignacion;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_incidencia", nullable = false)
    private Incidencia incidencia;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_tecnico", nullable = false)
    private Usuario tecnico;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_administrador", nullable = false)
    private Usuario administrador;

    @Column(name = "fecha_asignacion", nullable = false, updatable = false)
    private LocalDateTime fechaAsignacion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_asignacion", nullable = false)
    private EstadoAsignacion estadoAsignacion = EstadoAsignacion.ASIGNADA;

    @PrePersist
    void onCreate() {
        this.fechaAsignacion = LocalDateTime.now();
    }

    public Long getIdAsignacion() {
        return idAsignacion;
    }

    public void setIdAsignacion(Long idAsignacion) {
        this.idAsignacion = idAsignacion;
    }

    public Incidencia getIncidencia() {
        return incidencia;
    }

    public void setIncidencia(Incidencia incidencia) {
        this.incidencia = incidencia;
    }

    public Usuario getTecnico() {
        return tecnico;
    }

    public void setTecnico(Usuario tecnico) {
        this.tecnico = tecnico;
    }

    public Usuario getAdministrador() {
        return administrador;
    }

    public void setAdministrador(Usuario administrador) {
        this.administrador = administrador;
    }

    public LocalDateTime getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(LocalDateTime fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }

    public EstadoAsignacion getEstadoAsignacion() {
        return estadoAsignacion;
    }

    public void setEstadoAsignacion(EstadoAsignacion estadoAsignacion) {
        this.estadoAsignacion = estadoAsignacion;
    }
}

