package com.railfix.dam.entity;

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
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "reportes_tecnico")
public class ReporteTecnico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reporte")
    private Long idReporte;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_incidencia", nullable = false)
    private Incidencia incidencia;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_tecnico", nullable = false)
    private Usuario tecnico;

    @NotBlank
    @Column(name = "descripcion_reporte", nullable = false, columnDefinition = "TEXT")
    private String descripcionReporte;

    @Enumerated(EnumType.STRING)
    @Column(name = "urgencia_sugerida")
    private UrgenciaIncidencia urgenciaSugerida;

    @NotNull
    @Column(name = "requiere_mas_tecnicos", nullable = false)
    private Boolean requiereMasTecnicos = Boolean.FALSE;

    @NotNull
    @Column(name = "incidencia_resuelta", nullable = false)
    private Boolean incidenciaResuelta = Boolean.FALSE;

    @Column(name = "fecha_reporte", nullable = false, updatable = false)
    private LocalDateTime fechaReporte;

    @PrePersist
    void onCreate() {
        this.fechaReporte = LocalDateTime.now();
    }

    public Long getIdReporte() {
        return idReporte;
    }

    public void setIdReporte(Long idReporte) {
        this.idReporte = idReporte;
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

    public String getDescripcionReporte() {
        return descripcionReporte;
    }

    public void setDescripcionReporte(String descripcionReporte) {
        this.descripcionReporte = descripcionReporte;
    }

    public UrgenciaIncidencia getUrgenciaSugerida() {
        return urgenciaSugerida;
    }

    public void setUrgenciaSugerida(UrgenciaIncidencia urgenciaSugerida) {
        this.urgenciaSugerida = urgenciaSugerida;
    }

    public Boolean getRequiereMasTecnicos() {
        return requiereMasTecnicos;
    }

    public void setRequiereMasTecnicos(Boolean requiereMasTecnicos) {
        this.requiereMasTecnicos = requiereMasTecnicos;
    }

    public Boolean getIncidenciaResuelta() {
        return incidenciaResuelta;
    }

    public void setIncidenciaResuelta(Boolean incidenciaResuelta) {
        this.incidenciaResuelta = incidenciaResuelta;
    }

    public LocalDateTime getFechaReporte() {
        return fechaReporte;
    }

    public void setFechaReporte(LocalDateTime fechaReporte) {
        this.fechaReporte = fechaReporte;
    }
}

