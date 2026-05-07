export interface TecnicoIncidenciaDetail {
  id: number;
  titulo: string;
  descripcion: string;
  lineaId: number;
  lineaNombre: string;
  viaId: number;
  viaNombre: string;
  puntoKilometrico: number;
  urgencia: string;
  estado: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaCierre: string | null;
  estadoAsignacion: string;
  fechaAsignacion: string;
}
