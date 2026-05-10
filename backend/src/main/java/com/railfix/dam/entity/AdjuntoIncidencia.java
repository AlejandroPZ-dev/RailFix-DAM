package com.railfix.dam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "adjuntos_incidencia")
public class AdjuntoIncidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adjunto")
    private Long idAdjunto;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_incidencia", nullable = false)
    private Incidencia incidencia;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_usuario_subida", nullable = false)
    private Usuario usuarioSubida;

    @NotBlank
    @Column(name = "nombre_archivo_original", nullable = false)
    private String nombreArchivoOriginal;

    @NotBlank
    @Column(name = "nombre_archivo_guardado", nullable = false)
    private String nombreArchivoGuardado;

    @NotBlank
    @Column(name = "ruta_archivo", nullable = false)
    private String rutaArchivo;

    @NotBlank
    @Column(name = "tipo_mime", nullable = false)
    private String tipoMime;

    @NotNull
    @Column(name = "tamano_bytes", nullable = false)
    private Long tamanoBytes;

    @Column(name = "fecha_subida", nullable = false, updatable = false)
    private LocalDateTime fechaSubida;

    @PrePersist
    void onCreate() {
        this.fechaSubida = LocalDateTime.now();
    }

    public Long getIdAdjunto() {
        return idAdjunto;
    }

    public void setIdAdjunto(Long idAdjunto) {
        this.idAdjunto = idAdjunto;
    }

    public Incidencia getIncidencia() {
        return incidencia;
    }

    public void setIncidencia(Incidencia incidencia) {
        this.incidencia = incidencia;
    }

    public Usuario getUsuarioSubida() {
        return usuarioSubida;
    }

    public void setUsuarioSubida(Usuario usuarioSubida) {
        this.usuarioSubida = usuarioSubida;
    }

    public String getNombreArchivoOriginal() {
        return nombreArchivoOriginal;
    }

    public void setNombreArchivoOriginal(String nombreArchivoOriginal) {
        this.nombreArchivoOriginal = nombreArchivoOriginal;
    }

    public String getNombreArchivoGuardado() {
        return nombreArchivoGuardado;
    }

    public void setNombreArchivoGuardado(String nombreArchivoGuardado) {
        this.nombreArchivoGuardado = nombreArchivoGuardado;
    }

    public String getRutaArchivo() {
        return rutaArchivo;
    }

    public void setRutaArchivo(String rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    public String getTipoMime() {
        return tipoMime;
    }

    public void setTipoMime(String tipoMime) {
        this.tipoMime = tipoMime;
    }

    public Long getTamanoBytes() {
        return tamanoBytes;
    }

    public void setTamanoBytes(Long tamanoBytes) {
        this.tamanoBytes = tamanoBytes;
    }

    public LocalDateTime getFechaSubida() {
        return fechaSubida;
    }

    public void setFechaSubida(LocalDateTime fechaSubida) {
        this.fechaSubida = fechaSubida;
    }
}
