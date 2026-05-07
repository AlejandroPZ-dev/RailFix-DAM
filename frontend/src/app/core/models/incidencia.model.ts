export interface Incidencia {
  id: number;
  titulo: string;
  operarioCreadorId: number;
  operarioCreadorNombre: string;
  lineaId: number;
  lineaNombre: string;
  viaId: number;
  viaNombre: string;
  puntoKilometrico: number;
  descripcion: string;
  urgencia: string;
  estado: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaCierre: string | null;
}
