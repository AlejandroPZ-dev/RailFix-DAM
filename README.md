# RailFix DAM

Initial project structure for the RailFix DAM application.

This repository contains:

- `frontend/`: Angular frontend skeleton
- `backend/`: Spring Boot backend skeleton

## Requirements

Frontend:

- Node.js 20 or newer
- npm 10 or newer

Backend:

- Java 17 or newer
- Maven 3.9 or newer
- PostgreSQL
- Docker Desktop or Docker Engine

## Run PostgreSQL with Docker

```bash
cd docker
docker compose up -d
```

PostgreSQL will be available with:

- Host: `localhost`
- Port: `5433`
- Database: `railfix_dam`
- User: `postgres`
- Password: `postgres`

The backend includes an initial test dataset for:

- `usuarios`
- `lineas`
- `vias`
- `incidencias`

Important:

- The sample data is loaded by Spring Boot on startup after the tables are available.
- The inserts use `ON CONFLICT DO NOTHING`, so they can be re-run safely during development.

## Run the frontend

```bash
cd frontend
npm install
npm start
```

The Angular app will run on `http://localhost:4200`.

## Run the backend

Update the PostgreSQL values in `backend/src/main/resources/application.properties` if needed.

```bash
cd backend
mvn spring-boot:run
```

The API will run on `http://localhost:8080/api`.

Swagger UI will be available at:

- `http://localhost:8080/api/swagger-ui.html`

OpenAPI JSON will be available at:

- `http://localhost:8080/api/v3/api-docs`

## Test login users

All sample users use the password:

- `1234`

Available usernames:

- `operario1`
- `operario2`
- `admin1`
- `admin2`
- `tecnico1`
- `tecnico2`

## Notes

- This is only the base structure.
- Authentication logic is not implemented yet.
- Business logic is not implemented yet.
- The frontend includes prepared i18n support with Spanish as default and English as secondary language.
- Docker Compose is used only for the PostgreSQL database.
