package com.railfix.dam.dto;

import jakarta.validation.constraints.NotNull;

public class CerrarIncidenciaRequest {

    @NotNull
    private Long idUsuario;

    private String comentario;

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}
