INSERT INTO usuarios (
    id_usuario,
    nombre,
    apellidos,
    username,
    password_hash,
    rol,
    activo,
    fecha_creacion
)
VALUES
    (1, 'Ana', 'Lopez Martin', 'operario1', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'OPERARIO', true, '2026-04-01 08:00:00'),
    (2, 'Luis', 'Garcia Perez', 'operario2', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'OPERARIO', true, '2026-04-01 08:05:00'),
    (3, 'Marta', 'Sanchez Ruiz', 'admin1', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'ADMINISTRADOR', true, '2026-04-01 08:10:00'),
    (4, 'Javier', 'Navarro Diaz', 'admin2', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'ADMINISTRADOR', true, '2026-04-01 08:15:00'),
    (5, 'Elena', 'Torres Gomez', 'tecnico1', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'TECNICO', true, '2026-04-01 08:20:00'),
    (6, 'Pablo', 'Romero Gil', 'tecnico2', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'TECNICO', true, '2026-04-01 08:25:00')
ON CONFLICT (username) DO NOTHING;

UPDATE usuarios
SET password_hash = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'
WHERE username IN ('operario1', 'operario2', 'admin1', 'admin2', 'tecnico1', 'tecnico2');

INSERT INTO lineas (
    id_linea,
    codigo_linea,
    nombre,
    origen,
    destino,
    pk_inicial,
    pk_final
)
VALUES
    (1, 'L001', 'Linea Centro-Norte', 'Madrid', 'Valladolid', 0.00, 210.50),
    (2, 'L002', 'Linea Levante', 'Valencia', 'Castellon', 0.00, 78.30)
ON CONFLICT (codigo_linea) DO NOTHING;

INSERT INTO vias (
    id_via,
    id_linea,
    codigo_via,
    nombre,
    sentido,
    activa
)
VALUES
    (1, 1, 'VIA-001-A', 'Via 1 Centro-Norte', 'CRECIENTE', true),
    (2, 1, 'VIA-001-B', 'Via 2 Centro-Norte', 'DECRECIENTE', true),
    (3, 2, 'VIA-002-A', 'Via 1 Levante', 'AMBOS', true),
    (4, 2, 'VIA-002-B', 'Via 2 Levante', 'NO_APLICA', false)
ON CONFLICT DO NOTHING;

INSERT INTO incidencias (
    id_incidencia,
    id_linea,
    id_via,
    id_operario_creador,
    titulo,
    descripcion,
    punto_kilometrico,
    urgencia,
    estado,
    fecha_creacion,
    fecha_actualizacion,
    fecha_cierre,
    latitud,
    longitud,
    precision_gps_metros
)
VALUES
    (
        1,
        1,
        1,
        1,
        'Balasto desplazado',
        'Se detecta desplazamiento de balasto en el margen derecho de la via.',
        24.50,
        'MEDIA',
        'ABIERTA',
        '2026-04-10 09:00:00',
        '2026-04-10 09:00:00',
        NULL,
        40.4168,
        -3.7038,
        8.50
    ),
    (
        2,
        1,
        2,
        2,
        'Senalizacion intermitente',
        'Una senal lateral presenta parpadeo irregular durante el paso de trenes.',
        87.20,
        'ALTA',
        'ASIGNADA',
        '2026-04-11 11:15:00',
        '2026-04-11 12:00:00',
        NULL,
        41.6523,
        -4.7245,
        6.20
    ),
    (
        3,
        2,
        3,
        1,
        'Desgaste en carril',
        'Se aprecia desgaste superficial en un tramo curvo de la linea.',
        33.10,
        'MEDIA',
        'EN_REVISION',
        '2026-04-12 08:30:00',
        '2026-04-12 14:45:00',
        NULL,
        39.4699,
        -0.3763,
        5.00
    ),
    (
        4,
        2,
        3,
        2,
        'Obstruccion en drenaje',
        'Canaleta lateral con acumulacion de residuos que impide el drenaje.',
        54.80,
        'BAJA',
        'RESUELTA',
        '2026-04-13 10:10:00',
        '2026-04-13 16:20:00',
        NULL,
        39.9864,
        -0.0513,
        7.10
    ),
    (
        5,
        1,
        1,
        1,
        'Fijacion suelta en traviesa',
        'Se ha encontrado una fijacion suelta en zona de paso frecuente.',
        102.40,
        'CRITICA',
        'CERRADA',
        '2026-04-14 07:40:00',
        '2026-04-14 18:00:00',
        '2026-04-14 18:00:00',
        41.5000,
        -4.0000,
        4.80
    ),
    (
        6,
        2,
        4,
        2,
        'Via fuera de servicio pendiente de revision',
        'Tramo marcado como inactivo que necesita comprobacion visual.',
        70.00,
        'BAJA',
        'ABIERTA',
        '2026-04-15 09:25:00',
        '2026-04-15 09:25:00',
        NULL,
        NULL,
        NULL,
        NULL
    )
ON CONFLICT DO NOTHING;

SELECT setval(
    pg_get_serial_sequence('usuarios', 'id_usuario'),
    COALESCE((SELECT MAX(id_usuario) FROM usuarios), 1),
    true
);

SELECT setval(
    pg_get_serial_sequence('lineas', 'id_linea'),
    COALESCE((SELECT MAX(id_linea) FROM lineas), 1),
    true
);

SELECT setval(
    pg_get_serial_sequence('vias', 'id_via'),
    COALESCE((SELECT MAX(id_via) FROM vias), 1),
    true
);

SELECT setval(
    pg_get_serial_sequence('incidencias', 'id_incidencia'),
    COALESCE((SELECT MAX(id_incidencia) FROM incidencias), 1),
    true
);
