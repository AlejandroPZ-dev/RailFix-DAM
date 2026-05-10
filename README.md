# RailFix DAM

RailFix DAM es una aplicación web sencilla para la gestión de incidencias de mantenimiento ferroviario.

Este repositorio contiene:

- `frontend/`: aplicación Angular
- `backend/`: API REST con Spring Boot
- `database/scripts/`: scripts SQL manuales para PostgreSQL
- `docker/`: configuración de Docker Compose para la base de datos

## Requisitos

Frontend:

- Node.js 20 o superior
- npm 10 o superior

Backend:

- Java 17 o superior
- Maven 3.9 o superior

Base de datos:

- PostgreSQL
- Docker Desktop o Docker Engine

## Arrancar PostgreSQL con Docker

```bash
cd docker
docker compose up -d
```

PostgreSQL quedará disponible con estos valores:

- Host: `localhost`
- Puerto: `5433`
- Base de datos: `railfix_dam`
- Usuario: `postgres`
- Contraseña: `postgres`

El backend carga datos iniciales de prueba para:

- `usuarios`
- `lineas`
- `vias`
- `incidencias`

Notas sobre los datos de prueba:

- Spring Boot los carga al arrancar cuando las tablas ya existen.
- Los inserts usan `ON CONFLICT DO NOTHING`, por lo que pueden ejecutarse varias veces durante el desarrollo sin duplicar datos.

## Arrancar el frontend

```bash
cd frontend
npm install
npm start
```

La aplicación Angular quedará disponible en:

- `http://localhost:4200`

Si quieres probar la aplicación desde otros dispositivos de la misma red local:

```bash
cd frontend
npm start -- --host 0.0.0.0
```

## Arrancar el backend

Antes de probar la subida de imágenes en incidencias:

- Debes ejecutar manualmente el script `database/scripts/003_create_adjuntos_incidencia.sql` en PostgreSQL usando DBeaver.
- Este cambio no se aplica automáticamente desde la aplicación.

Si lo necesitas, revisa los valores de conexión en `backend/src/main/resources/application.properties`.

```bash
cd backend
mvn spring-boot:run
```

La API quedará disponible en:

- `http://localhost:8080/api`

Swagger UI:

- `http://localhost:8080/api/swagger-ui.html`

OpenAPI JSON:

- `http://localhost:8080/api/v3/api-docs`

## Usuarios de prueba

Todos los usuarios de prueba usan esta contraseña:

- `1234`

Usuarios disponibles:

- `operario1`
- `operario2`
- `admin1`
- `admin2`
- `tecnico1`
- `tecnico2`

## Adjuntos de imágenes en incidencias

La aplicación permite adjuntar imágenes opcionales a las incidencias.

Reglas actuales:

- máximo 3 imágenes por incidencia
- tamaño máximo de 5 MB por imagen
- formatos permitidos: JPG, PNG y WEBP

Funcionamiento técnico:

- los archivos se guardan en `backend/uploads/`
- PostgreSQL solo almacena metadatos y la ruta relativa del archivo
- no se almacenan imágenes como BLOB ni BYTEA

Importante:

- `uploads/` y `backend/uploads/` no deben subirse a Git
- si ejecutas el script `database/scripts/003_create_adjuntos_incidencia.sql`, hazlo manualmente en DBeaver antes de probar esta funcionalidad

## Notas del proyecto

- El proyecto está planteado como una aplicación DAM, con soluciones simples y mantenibles.
- Docker Compose se usa solo para PostgreSQL.
- La interfaz soporta español por defecto e inglés como idioma secundario.
- La lógica principal del MVP ya está implementada para operario, administrador y técnico.
