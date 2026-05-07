export interface HistorialIncidencia {
  idHistorial: number;
  usuarioId: number;
  usuarioNombre: string;
  accion: string;
  estadoAnterior: string | null;
  estadoNuevo: string | null;
  comentario: string | null;
  fechaAccion: string;
}

