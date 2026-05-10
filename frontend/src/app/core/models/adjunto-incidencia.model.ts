export interface AdjuntoIncidencia {
  idAdjunto: number;
  idIncidencia: number;
  nombreArchivoOriginal: string;
  nombreArchivoGuardado: string;
  tipoMime: string;
  tamanoBytes: number;
  fechaSubida: string;
  downloadUrl: string;
}
