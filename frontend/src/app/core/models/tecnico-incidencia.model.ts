export interface TecnicoIncidencia {
  id: number;
  titulo: string;
  lineaId: number;
  lineaNombre: string;
  viaId: number;
  viaNombre: string;
  puntoKilometrico: number;
  urgencia: string;
  estado: string;
  estadoAsignacion: string;
  fechaAsignacion: string;
}

