# AGENTS.md

## 1. Project Overview

This project is a web application called **RailFix DAM**.

The goal is to provide a simple system for managing railway maintenance incidents.

There are three user roles:

* OPERARIO: creates and consults incidents
* ADMINISTRADOR: manages incidents and assigns technicians
* TECNICO: works on assigned incidents and sends reports

The application must be simple, clear, and suitable for a DAM final project.

---

## 2. MVP Scope (STRICT)

The implementation MUST include only:

* User authentication (login)
* Role-based access (OPERARIO, ADMINISTRADOR, TECNICO)
* Create incidents (OPERARIO)
* View incidents (all roles with filtering)
* Assign incidents to technicians (ADMINISTRADOR)
* Technician reports (TECNICO)
* Close incidents (ADMINISTRADOR)
* Basic incident history tracking

DO NOT implement:

* Maps
* File/image uploads
* Notifications
* Mobile app
* Advanced dashboards

These are future extensions.

---

## 3. Internationalization (i18n)

The application MUST support two languages:

* Spanish (default)
* English

Requirements:

* All UI text must be translatable
* Use Angular i18n or ngx-translate
* Language selector must be available in the UI
* No hardcoded strings in components

---

## 4. Tech Stack

Frontend:

* Angular (latest stable)
* Angular Material (optional but recommended)
* Responsive design

Backend:

* Spring Boot (REST API)
* Java 17+

Database:

* PostgreSQL

Other:

* Docker Compose for database only

---

## 5. Data Model

Entities:

### usuarios

* id_usuario (PK)
* nombre
* apellidos
* username (UNIQUE)
* password_hash
* rol (OPERARIO, ADMINISTRADOR, TECNICO)
* activo
* fecha_creacion

### lineas

* id_linea (PK)
* codigo_linea (UNIQUE)
* nombre (UNIQUE)
* origen
* destino
* pk_inicial
* pk_final

### vias

* id_via (PK)
* id_linea (FK)
* codigo_via
* nombre
* sentido (CRECIENTE, DECRECIENTE, AMBOS, NO_APLICA)
* activa

### incidencias

* id_incidencia (PK)
* id_linea (FK)
* id_via (FK)
* id_operario_creador (FK)
* titulo
* descripcion
* punto_kilometrico
* urgencia (BAJA, MEDIA, ALTA, CRITICA)
* estado (ABIERTA, ASIGNADA, EN_REVISION, RESUELTA, CERRADA)
* fecha_creacion
* fecha_actualizacion
* fecha_cierre
* latitud (nullable)
* longitud (nullable)
* precision_gps_metros (nullable)

### asignaciones_incidencia

* id_asignacion (PK)
* id_incidencia (FK)
* id_tecnico (FK)
* id_administrador (FK)
* fecha_asignacion
* estado_asignacion (ASIGNADA, EN_CURSO, FINALIZADA)

### reportes_tecnico

* id_reporte (PK)
* id_incidencia (FK)
* id_tecnico (FK)
* descripcion_reporte
* urgencia_sugerida
* requiere_mas_tecnicos
* incidencia_resuelta
* fecha_reporte

### historial_incidencia

* id_historial (PK)
* id_incidencia (FK)
* id_usuario (FK)
* accion
* estado_anterior
* estado_nuevo
* comentario
* fecha_accion

---

## 6. Backend Rules

* Use REST API design
* Use clear endpoints: /incidencias, /usuarios, etc.
* Use DTOs only if necessary (keep simple)
* Use basic service layer (Controller → Service → Repository)
* Use JPA/Hibernate
* Add basic validation
* Use meaningful HTTP status codes

Keep the code simple and readable.

---

## 7. Frontend Rules

* Use Angular components per feature:

  * login
  * incidencias
  * asignaciones
  * reportes

* Use services for API calls

* Use reactive forms

* Use basic routing with guards by role

* No complex state management (NO NgRx)

---

## 8. UX Rules

* Simple and clean UI
* No overdesign
* Clear forms
* Tables with filters
* Role-based navigation

---

## 9. Development Workflow (IMPORTANT)

Codex MUST:

1. Work in small steps
2. Generate one feature at a time
3. Ensure code compiles before moving on
4. Avoid modifying unrelated files
5. Prefer simple solutions over complex ones

---

## 10. Constraints

* DO NOT overengineer
* DO NOT add unnecessary libraries
* DO NOT implement features outside MVP
* DO NOT create complex architectures

This is a DAM project, not an enterprise system.

---

## 11. Future Extensions (DO NOT IMPLEMENT NOW)

* Map visualization (Leaflet + OpenStreetMap)
* Image upload for incidents
* Mobile app (Capacitor)
* Advanced analytics/dashboard
* Notifications

These should only be considered after MVP is complete.

---
