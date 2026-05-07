package com.railfix.dam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReporteTecnicoRequest {

    @NotNull
    private Long idTecnico;

    @NotBlank
    private String descripcionReporte;

    private String urgenciaSugerida;

    @NotNull
    private Boolean requiereMasTecnicos;

    @NotNull
    private Boolean incidenciaResuelta;

    public Long getIdTecnico() {
        return idTecnico;
    }

    public void setIdTecnico(Long idTecnico) {
        this.idTecnico = idTecnico;
    }

    public String getDescripcionReporte() {
        return descripcionReporte;
    }

    public void setDescripcionReporte(String descripcionReporte) {
        this.descripcionReporte = descripcionReporte;
    }

    public String getUrgenciaSugerida() {
        return urgenciaSugerida;
    }

    public void setUrgenciaSugerida(String urgenciaSugerida) {
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
}
