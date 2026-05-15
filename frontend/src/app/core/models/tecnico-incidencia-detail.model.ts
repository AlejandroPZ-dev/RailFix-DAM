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
  latitud: number | null;
  longitud: number | null;
  precisionGpsMetros: number | null;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaCierre: string | null;
  estadoAsignacion: string;
  fechaAsignacion: string;
}
