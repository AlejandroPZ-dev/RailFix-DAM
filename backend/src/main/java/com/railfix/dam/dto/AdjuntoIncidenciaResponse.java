package com.railfix.dam.dto;

import java.time.LocalDateTime;

public class AdjuntoIncidenciaResponse {

    private Long idAdjunto;
    private Long idIncidencia;
    private String nombreArchivoOriginal;
    private String nombreArchivoGuardado;
    private String tipoMime;
    private Long tamanoBytes;
    private LocalDateTime fechaSubida;
    private String downloadUrl;

    public AdjuntoIncidenciaResponse(
        Long idAdjunto,
        Long idIncidencia,
        String nombreArchivoOriginal,
        String nombreArchivoGuardado,
        String tipoMime,
        Long tamanoBytes,
        LocalDateTime fechaSubida,
        String downloadUrl
    ) {
        this.idAdjunto = idAdjunto;
        this.idIncidencia = idIncidencia;
        this.nombreArchivoOriginal = nombreArchivoOriginal;
        this.nombreArchivoGuardado = nombreArchivoGuardado;
        this.tipoMime = tipoMime;
        this.tamanoBytes = tamanoBytes;
        this.fechaSubida = fechaSubida;
        this.downloadUrl = downloadUrl;
    }

    public Long getIdAdjunto() {
        return idAdjunto;
    }

    public Long getIdIncidencia() {
        return idIncidencia;
    }

    public String getNombreArchivoOriginal() {
        return nombreArchivoOriginal;
    }

    public String getNombreArchivoGuardado() {
        return nombreArchivoGuardado;
    }

    public String getTipoMime() {
        return tipoMime;
    }

    public Long getTamanoBytes() {
        return tamanoBytes;
    }

    public LocalDateTime getFechaSubida() {
        return fechaSubida;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }
}
