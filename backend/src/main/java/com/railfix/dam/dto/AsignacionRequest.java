package com.railfix.dam.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class AsignacionRequest {

    @NotEmpty
    private List<Long> tecnicoIds;

    @NotNull
    private Long idAdministrador;

    public List<Long> getTecnicoIds() {
        return tecnicoIds;
    }

    public void setTecnicoIds(List<Long> tecnicoIds) {
        this.tecnicoIds = tecnicoIds;
    }

    public Long getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(Long idAdministrador) {
        this.idAdministrador = idAdministrador;
    }
}
