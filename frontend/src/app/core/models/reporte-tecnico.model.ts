export interface ReporteTecnico {
  idReporte: number;
  incidenciaId: number;
  tituloIncidencia: string;
  tecnicoId: number;
  tecnicoNombre: string;
  tecnicoApellidos: string;
  descripcionReporte: string;
  urgenciaSugerida: string | null;
  requiereMasTecnicos: boolean;
  incidenciaResuelta: boolean;
  estadoIncidencia: string;
  urgenciaActualIncidencia: string;
  fechaReporte: string;
}
