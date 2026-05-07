export const translations = {
  es: {
    app: {
      title: 'RailFix DAM',
      subtitle: 'Gestion basica de incidencias ferroviarias'
    },
    languages: {
      es: 'Espanol',
      en: 'Ingles'
    },
    roles: {
      OPERARIO: 'Operario',
      ADMINISTRADOR: 'Administrador',
      TECNICO: 'Tecnico'
    },
    layout: {
      language: 'Idioma',
      role: 'Rol',
      navigation: 'Navegacion',
      logout: 'Cerrar sesion'
    },
    toast: {
      close: 'Cerrar aviso',
      error: {
        title: 'Aviso'
      },
      success: {
        title: 'Operacion completada'
      },
      info: {
        title: 'Informacion'
      }
    },
    common: {
      yes: 'Si',
      no: 'No'
    },
    nav: {
      operarioDashboard: 'Panel operario',
      operarioIncidencias: 'Consultar incidencias',
      operarioNuevaIncidencia: 'Registrar incidencia',
      adminDashboard: 'Panel administrador',
      adminIncidencias: 'Gestionar incidencias',
      adminReportes: 'Revisar reportes tecnicos',
      tecnicoDashboard: 'Panel tecnico',
      tecnicoIncidencias: 'Mis incidencias'
    },
    login: {
      title: 'Inicio de sesion',
      subtitle: 'Acceso al sistema RailFix DAM',
      username: 'Usuario',
      password: 'Contrasena',
      submit: 'Entrar',
      error: {
        requiredFields: 'Debes completar usuario y contrasena.',
        invalidCredentials: 'Usuario o contrasena incorrectos.',
        serverUnavailable: 'No se ha podido conectar con el servidor.'
      }
    },
    incidenciaUrgencia: {
      BAJA: 'Baja',
      MEDIA: 'Media',
      ALTA: 'Alta',
      CRITICA: 'Critica'
    },
    incidenciaEstado: {
      ABIERTA: 'Abierta',
      ASIGNADA: 'Asignada',
      EN_REVISION: 'En revision',
      RESUELTA: 'Resuelta',
      CERRADA: 'Cerrada'
    },
    historialAccion: {
      ASIGNADA: 'Asignada',
      CAMBIO_ESTADO: 'Cambio de estado',
      ACTUALIZADA: 'Actualizada',
      CERRADA: 'Cerrada',
      REPORTE_TECNICO: 'Reporte tecnico',
      TECNICO_DESASIGNADO: 'Tecnico desasignado'
    },
    estadoAsignacion: {
      ASIGNADA: 'Asignada',
      EN_CURSO: 'En curso',
      FINALIZADA: 'Finalizada'
    },
    operario: {
      dashboard: {
        title: 'Panel de operario',
        welcome: 'Bienvenido, {{name}}.',
        viewIncidents: 'Consultar incidencias',
        viewIncidentsHelp: 'Consulta el listado actual de incidencias registradas.',
        createIncident: 'Registrar incidencia',
        createIncidentHelp: 'Crea una nueva incidencia ferroviaria.'
      },
      list: {
        title: 'Incidencias registradas',
        subtitle: 'Consulta las incidencias disponibles con filtros basicos.',
        loading: 'Cargando incidencias...',
        empty: 'No hay incidencias para los filtros seleccionados.',
        filters: {
          all: 'Todos',
          estado: 'Estado',
          urgencia: 'Urgencia',
          linea: 'Linea'
        },
        columns: {
          id: 'Id',
          titulo: 'Titulo',
          linea: 'Linea',
          via: 'Via',
          puntoKilometrico: 'Punto kilometrico',
          urgencia: 'Urgencia',
          estado: 'Estado',
          fechaCreacion: 'Fecha de creacion'
        }
      },
      form: {
        title: 'Nueva incidencia',
        subtitle: 'Registra una nueva incidencia como operario.',
        selectPlaceholder: 'Selecciona una opcion',
        pkRange: 'Rango permitido: de {{min}} a {{max}}.',
        submit: 'Guardar incidencia',
        success: 'La incidencia se ha creado correctamente.',
        fields: {
          linea: 'Linea',
          via: 'Via',
          puntoKilometrico: 'Punto kilometrico',
          titulo: 'Titulo',
          descripcion: 'Descripcion',
          urgencia: 'Urgencia'
        },
        errors: {
          invalidForm: 'Debes completar todos los campos obligatorios.',
          invalidLine: 'La linea seleccionada no es valida.',
          pkOutOfRange: 'El punto kilometrico no esta dentro del rango de la linea seleccionada.',
          createFailed: 'No se ha podido crear la incidencia.'
        }
      }
    },
    admin: {
      dashboard: {
        title: 'Panel de administrador',
        welcome: 'Bienvenido, {{name}}.',
        manageIncidents: 'Gestionar incidencias',
        manageIncidentsHelp: 'Consulta incidencias y asigna tecnicos.',
        reviewReports: 'Revisar reportes tecnicos',
        reviewReportsHelp: 'Consulta reportes enviados por los tecnicos y decide las acciones a aplicar.'
      },
      list: {
        title: 'Gestion de incidencias',
        subtitle: 'Consulta incidencias y accede al detalle.',
        loading: 'Cargando incidencias...',
        empty: 'No hay incidencias para los filtros seleccionados.',
        viewDetail: 'Ver detalle',
        filters: {
          all: 'Todos',
          estado: 'Estado',
          urgencia: 'Urgencia',
          linea: 'Linea'
        },
        columns: {
          id: 'Id',
          titulo: 'Titulo',
          linea: 'Linea',
          via: 'Via',
          puntoKilometrico: 'Punto kilometrico',
          urgencia: 'Urgencia',
          estado: 'Estado',
          fechaCreacion: 'Fecha de creacion',
          acciones: 'Acciones'
        }
      },
      detail: {
        title: 'Incidencia #{{id}}',
        loading: 'Cargando detalle de la incidencia...',
        loadError: 'No se ha podido cargar el detalle de la incidencia.',
        assignedTechnicians: 'Tecnicos asignados',
        noAssignments: 'No hay tecnicos asignados.',
        historyTitle: 'Historial de la incidencia',
        noHistory: 'No hay movimientos registrados todavia.',
        reportsTitle: 'Reportes tecnicos',
        noReports: 'Todavia no hay reportes tecnicos para esta incidencia.',
        reportUrgency: 'Urgencia sugerida',
        noSuggestedUrgency: 'Sin sugerencia',
        updateDescriptionTitle: 'Actualizar descripcion',
        updateDescriptionAction: 'Guardar descripcion',
        updateStatusTitle: 'Cambiar estado',
        updateStatusAction: 'Guardar estado',
        assignLabel: 'Seleccionar tecnicos',
        assignAction: 'Asignar tecnicos',
        removeAction: 'Quitar',
        assignSuccess: 'Los tecnicos se han asignado correctamente.',
        assignError: 'No se ha podido asignar los tecnicos.',
        removeSuccess: 'El tecnico se ha desasignado correctamente.',
        removeError: 'No se ha podido desasignar el tecnico.',
        descriptionSuccess: 'La descripcion se ha actualizado correctamente.',
        descriptionError: 'No se ha podido actualizar la descripcion.',
        statusSuccess: 'El estado se ha actualizado correctamente.',
        statusError: 'No se ha podido actualizar el estado.',
        fields: {
          id: 'Id',
          titulo: 'Titulo',
          linea: 'Linea',
          via: 'Via',
          puntoKilometrico: 'Punto kilometrico',
          urgencia: 'Urgencia',
          estado: 'Estado',
          operarioCreador: 'Operario creador',
          fechaCreacion: 'Fecha de creacion',
          fechaActualizacion: 'Fecha de actualizacion',
          fechaCierre: 'Fecha de cierre',
          descripcion: 'Descripcion'
        }
      },
      reports: {
        title: 'Reportes tecnicos',
        subtitle: 'Revisa los reportes enviados por los tecnicos.',
        loading: 'Cargando reportes tecnicos...',
        empty: 'No hay reportes tecnicos.',
        emptyFiltered: 'No se encontraron reportes con los filtros indicados.',
        loadError: 'No se han podido cargar los reportes tecnicos.',
        noSuggestedUrgency: 'Sin sugerencia',
        viewIncident: 'Ver incidencia',
        applySuggestedUrgency: 'Aplicar urgencia sugerida',
        markInReview: 'Marcar en revision',
        closeIncident: 'Cerrar incidencia',
        actionSuccess: 'Accion realizada correctamente.',
        actionError: 'No se ha podido completar la accion.',
        filters: {
          title: 'Filtros',
          idIncidencia: 'ID incidencia',
          idTecnico: 'Tecnico',
          allTechnicians: 'Todos los tecnicos',
          estadoIncidencia: 'Estado de la incidencia',
          allStates: 'Todos los estados',
          fechaDesde: 'Fecha desde',
          fechaHasta: 'Fecha hasta',
          incidenciaResuelta: 'Incidencia resuelta',
          allResolved: 'Todas',
          search: 'Buscar',
          clear: 'Limpiar'
        },
        columns: {
          idReporte: 'Id reporte',
          idIncidencia: 'Id incidencia',
          tituloIncidencia: 'Incidencia',
          tecnico: 'Tecnico',
          fechaReporte: 'Fecha del reporte',
          descripcionReporte: 'Descripcion del reporte',
          urgenciaSugerida: 'Urgencia sugerida',
          urgenciaActualIncidencia: 'Urgencia actual',
          estadoIncidencia: 'Estado de la incidencia',
          requiereMasTecnicos: 'Requiere mas tecnicos',
          incidenciaResuelta: 'Incidencia resuelta',
          acciones: 'Acciones'
        }
      }
    },
    tecnico: {
      dashboard: {
        title: 'Panel tecnico',
        welcome: 'Bienvenido, {{name}}.',
        myIncidents: 'Mis incidencias asignadas',
        myIncidentsHelp: 'Consulta las incidencias que tienes asignadas.'
      },
      list: {
        title: 'Incidencias asignadas',
        subtitle: 'Consulta las incidencias que tienes asignadas como tecnico.',
        loading: 'Cargando incidencias asignadas...',
        empty: 'No tienes incidencias asignadas.',
        loadError: 'No se han podido cargar tus incidencias asignadas.',
        viewDetail: 'Ver detalle',
        filters: {
          all: 'Todos',
          estado: 'Estado',
          urgencia: 'Urgencia',
          estadoAsignacion: 'Estado de asignacion'
        },
        columns: {
          id: 'Id',
          titulo: 'Titulo',
          linea: 'Linea',
          via: 'Via',
          puntoKilometrico: 'Punto kilometrico',
          urgencia: 'Urgencia',
          estado: 'Estado',
          estadoAsignacion: 'Estado de asignacion',
          fechaAsignacion: 'Fecha de asignacion',
          acciones: 'Acciones'
        }
      },
      detail: {
        title: 'Incidencia #{{id}}',
        loading: 'Cargando detalle de la incidencia...',
        loadError: 'No se ha podido cargar el detalle de la incidencia.',
        forbidden: 'No tiene permiso para ver esta incidencia',
        reportsTitle: 'Mis reportes tecnicos',
        noReports: 'Todavia no has enviado reportes para esta incidencia.',
        createReport: 'Crear reporte',
        reportUrgency: 'Urgencia sugerida',
        reportRequiresMore: 'Requiere mas tecnicos',
        reportResolved: 'Incidencia resuelta',
        fields: {
          id: 'Id',
          linea: 'Linea',
          via: 'Via',
          puntoKilometrico: 'Punto kilometrico',
          urgencia: 'Urgencia',
          estado: 'Estado',
          estadoAsignacion: 'Estado de asignacion',
          fechaAsignacion: 'Fecha de asignacion',
          fechaCreacion: 'Fecha de creacion',
          fechaActualizacion: 'Fecha de actualizacion',
          fechaCierre: 'Fecha de cierre',
          descripcion: 'Descripcion'
        }
      },
      report: {
        title: 'Nuevo reporte tecnico',
        subtitle: 'Completa la informacion tecnica de la incidencia.',
        submit: 'Enviar reporte',
        success: 'El reporte tecnico se ha enviado correctamente.',
        error: 'No se ha podido enviar el reporte tecnico.',
        validationError: 'Debes completar una descripcion valida para el reporte.',
        emptyUrgency: 'Sin sugerencia',
        fields: {
          descripcionReporte: 'Descripcion del reporte',
          urgenciaSugerida: 'Urgencia sugerida',
          requiereMasTecnicos: 'Requiere mas tecnicos',
          incidenciaResuelta: 'Incidencia resuelta'
        }
      },
      common: {
        back: 'Volver'
      }
    },
    incidencias: {
      title: 'Incidencias',
      subtitle: 'Vista inicial para consultar incidencias',
      placeholder: 'Aqui se anadira el listado y filtrado de incidencias en siguientes pasos.'
    }
  },
  en: {
    app: {
      title: 'RailFix DAM',
      subtitle: 'Basic railway incident management'
    },
    languages: {
      es: 'Spanish',
      en: 'English'
    },
    roles: {
      OPERARIO: 'Operator',
      ADMINISTRADOR: 'Administrator',
      TECNICO: 'Technician'
    },
    layout: {
      language: 'Language',
      role: 'Role',
      navigation: 'Navigation',
      logout: 'Log out'
    },
    toast: {
      close: 'Close notification',
      error: {
        title: 'Notice'
      },
      success: {
        title: 'Operation completed'
      },
      info: {
        title: 'Information'
      }
    },
    common: {
      yes: 'Yes',
      no: 'No'
    },
    nav: {
      operarioDashboard: 'Operator dashboard',
      operarioIncidencias: 'Browse incidents',
      operarioNuevaIncidencia: 'Create incident',
      adminDashboard: 'Administrator dashboard',
      adminIncidencias: 'Manage incidents',
      adminReportes: 'Review technical reports',
      tecnicoDashboard: 'Technician dashboard',
      tecnicoIncidencias: 'My incidents'
    },
    login: {
      title: 'Sign in',
      subtitle: 'Access to the RailFix DAM system',
      username: 'Username',
      password: 'Password',
      submit: 'Enter',
      error: {
        requiredFields: 'You must fill in username and password.',
        invalidCredentials: 'Incorrect username or password.',
        serverUnavailable: 'The server could not be reached.'
      }
    },
    incidenciaUrgencia: {
      BAJA: 'Low',
      MEDIA: 'Medium',
      ALTA: 'High',
      CRITICA: 'Critical'
    },
    incidenciaEstado: {
      ABIERTA: 'Open',
      ASIGNADA: 'Assigned',
      EN_REVISION: 'In review',
      RESUELTA: 'Resolved',
      CERRADA: 'Closed'
    },
    historialAccion: {
      ASIGNADA: 'Assigned',
      CAMBIO_ESTADO: 'Status change',
      ACTUALIZADA: 'Updated',
      CERRADA: 'Closed',
      REPORTE_TECNICO: 'Technical report',
      TECNICO_DESASIGNADO: 'Technician removed'
    },
    estadoAsignacion: {
      ASIGNADA: 'Assigned',
      EN_CURSO: 'In progress',
      FINALIZADA: 'Completed'
    },
    operario: {
      dashboard: {
        title: 'Operator dashboard',
        welcome: 'Welcome, {{name}}.',
        viewIncidents: 'Browse incidents',
        viewIncidentsHelp: 'Review the current list of registered incidents.',
        createIncident: 'Create incident',
        createIncidentHelp: 'Create a new railway incident.'
      },
      list: {
        title: 'Registered incidents',
        subtitle: 'Review available incidents with basic filters.',
        loading: 'Loading incidents...',
        empty: 'There are no incidents for the selected filters.',
        filters: {
          all: 'All',
          estado: 'Status',
          urgencia: 'Urgency',
          linea: 'Line'
        },
        columns: {
          id: 'Id',
          titulo: 'Title',
          linea: 'Line',
          via: 'Track',
          puntoKilometrico: 'Kilometric point',
          urgencia: 'Urgency',
          estado: 'Status',
          fechaCreacion: 'Created at'
        }
      },
      form: {
        title: 'New incident',
        subtitle: 'Register a new incident as an operator.',
        selectPlaceholder: 'Select an option',
        pkRange: 'Allowed range: from {{min}} to {{max}}.',
        submit: 'Save incident',
        success: 'The incident has been created successfully.',
        fields: {
          linea: 'Line',
          via: 'Track',
          puntoKilometrico: 'Kilometric point',
          titulo: 'Title',
          descripcion: 'Description',
          urgencia: 'Urgency'
        },
        errors: {
          invalidForm: 'You must complete all required fields.',
          invalidLine: 'The selected line is not valid.',
          pkOutOfRange: 'The kilometric point is outside the selected line range.',
          createFailed: 'The incident could not be created.'
        }
      }
    },
    admin: {
      dashboard: {
        title: 'Administrator dashboard',
        welcome: 'Welcome, {{name}}.',
        manageIncidents: 'Manage incidents',
        manageIncidentsHelp: 'Review incidents and assign technicians.',
        reviewReports: 'Review technical reports',
        reviewReportsHelp: 'Review technician reports and decide which actions to apply.'
      },
      list: {
        title: 'Incident management',
        subtitle: 'Review incidents and open the detail view.',
        loading: 'Loading incidents...',
        empty: 'There are no incidents for the selected filters.',
        viewDetail: 'View detail',
        filters: {
          all: 'All',
          estado: 'Status',
          urgencia: 'Urgency',
          linea: 'Line'
        },
        columns: {
          id: 'Id',
          titulo: 'Title',
          linea: 'Line',
          via: 'Track',
          puntoKilometrico: 'Kilometric point',
          urgencia: 'Urgency',
          estado: 'Status',
          fechaCreacion: 'Created at',
          acciones: 'Actions'
        }
      },
      detail: {
        title: 'Incident #{{id}}',
        loading: 'Loading incident detail...',
        loadError: 'The incident detail could not be loaded.',
        assignedTechnicians: 'Assigned technicians',
        noAssignments: 'There are no assigned technicians.',
        historyTitle: 'Incident history',
        noHistory: 'There are no recorded changes yet.',
        reportsTitle: 'Technical reports',
        noReports: 'There are no technical reports for this incident yet.',
        reportUrgency: 'Suggested urgency',
        noSuggestedUrgency: 'No suggestion',
        updateDescriptionTitle: 'Update description',
        updateDescriptionAction: 'Save description',
        updateStatusTitle: 'Change status',
        updateStatusAction: 'Save status',
        assignLabel: 'Select technicians',
        assignAction: 'Assign technicians',
        removeAction: 'Remove',
        assignSuccess: 'The technicians were assigned successfully.',
        assignError: 'The technicians could not be assigned.',
        removeSuccess: 'The technician was removed successfully.',
        removeError: 'The technician could not be removed.',
        descriptionSuccess: 'The description was updated successfully.',
        descriptionError: 'The description could not be updated.',
        statusSuccess: 'The status was updated successfully.',
        statusError: 'The status could not be updated.',
        fields: {
          id: 'Id',
          titulo: 'Title',
          linea: 'Line',
          via: 'Track',
          puntoKilometrico: 'Kilometric point',
          urgencia: 'Urgency',
          estado: 'Status',
          operarioCreador: 'Created by operator',
          fechaCreacion: 'Created at',
          fechaActualizacion: 'Updated at',
          fechaCierre: 'Closed at',
          descripcion: 'Description'
        }
      },
      reports: {
        title: 'Technical reports',
        subtitle: 'Review the reports submitted by technicians.',
        loading: 'Loading technical reports...',
        empty: 'There are no technical reports.',
        emptyFiltered: 'No reports found with the selected filters.',
        loadError: 'Technical reports could not be loaded.',
        noSuggestedUrgency: 'No suggestion',
        viewIncident: 'View incident',
        applySuggestedUrgency: 'Apply suggested urgency',
        markInReview: 'Mark as under review',
        closeIncident: 'Close incident',
        actionSuccess: 'Action completed successfully.',
        actionError: 'The action could not be completed.',
        filters: {
          title: 'Filters',
          idIncidencia: 'Incident ID',
          idTecnico: 'Technician',
          allTechnicians: 'All technicians',
          estadoIncidencia: 'Incident state',
          allStates: 'All states',
          fechaDesde: 'Date from',
          fechaHasta: 'Date to',
          incidenciaResuelta: 'Incident resolved',
          allResolved: 'All',
          search: 'Search',
          clear: 'Clear'
        },
        columns: {
          idReporte: 'Report id',
          idIncidencia: 'Incident id',
          tituloIncidencia: 'Incident',
          tecnico: 'Technician',
          fechaReporte: 'Report date',
          descripcionReporte: 'Report description',
          urgenciaSugerida: 'Suggested urgency',
          urgenciaActualIncidencia: 'Current urgency',
          estadoIncidencia: 'Incident state',
          requiereMasTecnicos: 'Requires more technicians',
          incidenciaResuelta: 'Incident resolved',
          acciones: 'Actions'
        }
      }
    },
    tecnico: {
      dashboard: {
        title: 'Technician dashboard',
        welcome: 'Welcome, {{name}}.',
        myIncidents: 'My assigned incidents',
        myIncidentsHelp: 'Review the incidents assigned to you.'
      },
      list: {
        title: 'Assigned incidents',
        subtitle: 'Review the incidents assigned to you as a technician.',
        loading: 'Loading assigned incidents...',
        empty: 'You do not have assigned incidents.',
        loadError: 'Your assigned incidents could not be loaded.',
        viewDetail: 'View detail',
        filters: {
          all: 'All',
          estado: 'Status',
          urgencia: 'Urgency',
          estadoAsignacion: 'Assignment status'
        },
        columns: {
          id: 'Id',
          titulo: 'Title',
          linea: 'Line',
          via: 'Track',
          puntoKilometrico: 'Kilometric point',
          urgencia: 'Urgency',
          estado: 'Status',
          estadoAsignacion: 'Assignment status',
          fechaAsignacion: 'Assigned at',
          acciones: 'Actions'
        }
      },
      detail: {
        title: 'Incident #{{id}}',
        loading: 'Loading incident detail...',
        loadError: 'The incident detail could not be loaded.',
        forbidden: 'You do not have permission to view this incident',
        reportsTitle: 'My technical reports',
        noReports: 'You have not sent reports for this incident yet.',
        createReport: 'Create report',
        reportUrgency: 'Suggested urgency',
        reportRequiresMore: 'Requires more technicians',
        reportResolved: 'Incident resolved',
        fields: {
          id: 'Id',
          linea: 'Line',
          via: 'Track',
          puntoKilometrico: 'Kilometric point',
          urgencia: 'Urgency',
          estado: 'Status',
          estadoAsignacion: 'Assignment status',
          fechaAsignacion: 'Assigned at',
          fechaCreacion: 'Created at',
          fechaActualizacion: 'Updated at',
          fechaCierre: 'Closed at',
          descripcion: 'Description'
        }
      },
      report: {
        title: 'New technical report',
        subtitle: 'Complete the technical information for the incident.',
        submit: 'Send report',
        success: 'The technical report was sent successfully.',
        error: 'The technical report could not be sent.',
        validationError: 'You must complete a valid report description.',
        emptyUrgency: 'No suggestion',
        fields: {
          descripcionReporte: 'Report description',
          urgenciaSugerida: 'Suggested urgency',
          requiereMasTecnicos: 'Requires more technicians',
          incidenciaResuelta: 'Incident resolved'
        }
      },
      common: {
        back: 'Back'
      }
    },
    incidencias: {
      title: 'Incidents',
      subtitle: 'Initial view to browse incidents',
      placeholder: 'The incident list and filters will be added in later steps.'
    }
  }
};
