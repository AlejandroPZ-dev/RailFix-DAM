package com.railfix.dam.controller;

import com.railfix.dam.dto.ViaResponse;
import com.railfix.dam.service.ViaService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vias")
public class ViaController {

    private final ViaService viaService;

    public ViaController(ViaService viaService) {
        this.viaService = viaService;
    }

    @GetMapping
    public List<ViaResponse> getAll(@RequestParam(required = false) Long lineaId) {
        if (lineaId == null) {
            return viaService.findAll().stream()
                .map(via -> new ViaResponse(
                    via.getIdVia(),
                    via.getLinea().getIdLinea(),
                    via.getCodigoVia(),
                    via.getNombre(),
                    via.getSentido().name(),
                    via.getActiva()
                ))
                .toList();
        }

        return viaService.findByLineaId(lineaId);
    }
}
