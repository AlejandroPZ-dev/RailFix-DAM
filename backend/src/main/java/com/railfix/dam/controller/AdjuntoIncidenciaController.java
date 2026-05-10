package com.railfix.dam.controller;

import com.railfix.dam.dto.AdjuntoIncidenciaResponse;
import com.railfix.dam.service.AdjuntoIncidenciaService;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping
public class AdjuntoIncidenciaController {

    private final AdjuntoIncidenciaService adjuntoIncidenciaService;

    public AdjuntoIncidenciaController(AdjuntoIncidenciaService adjuntoIncidenciaService) {
        this.adjuntoIncidenciaService = adjuntoIncidenciaService;
    }

    @PostMapping("/incidencias/{idIncidencia}/adjuntos")
    public ResponseEntity<List<AdjuntoIncidenciaResponse>> uploadAdjuntos(
        @PathVariable Long idIncidencia,
        @RequestParam("files") List<MultipartFile> files,
        @RequestParam Long idUsuario
    ) {
        return ResponseEntity.status(201).body(
            adjuntoIncidenciaService.uploadAdjuntos(idIncidencia, idUsuario, files)
        );
    }

    @GetMapping("/incidencias/{idIncidencia}/adjuntos")
    public List<AdjuntoIncidenciaResponse> getAdjuntosByIncidencia(@PathVariable Long idIncidencia) {
        return adjuntoIncidenciaService.findByIncidenciaId(idIncidencia);
    }

    @GetMapping("/adjuntos/{idAdjunto}/download")
    public ResponseEntity<Resource> downloadAdjunto(@PathVariable Long idAdjunto) {
        AdjuntoIncidenciaService.DownloadAdjuntoData downloadData = adjuntoIncidenciaService.getDownloadData(idAdjunto);

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(downloadData.getTipoMime()))
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                ContentDisposition.inline().filename(downloadData.getNombreArchivoOriginal()).build().toString()
            )
            .body(downloadData.getResource());
    }
}
