CREATE TABLE adjuntos_incidencia (
    id_adjunto BIGSERIAL PRIMARY KEY,
    id_incidencia BIGINT NOT NULL,
    id_usuario_subida BIGINT NOT NULL,
    nombre_archivo_original VARCHAR(255) NOT NULL,
    nombre_archivo_guardado VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    tipo_mime VARCHAR(100) NOT NULL,
    tamano_bytes BIGINT NOT NULL,
    fecha_subida TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_adjuntos_incidencia
        FOREIGN KEY (id_incidencia)
        REFERENCES incidencias(id_incidencia),
    CONSTRAINT fk_adjuntos_usuario
        FOREIGN KEY (id_usuario_subida)
        REFERENCES usuarios(id_usuario)
);

CREATE INDEX idx_adjuntos_incidencia
ON adjuntos_incidencia(id_incidencia);
