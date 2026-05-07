package com.railfix.dam.service;

import com.railfix.dam.dto.CreateIncidenciaRequest;
import com.railfix.dam.entity.Linea;
import com.railfix.dam.entity.Usuario;
import com.railfix.dam.entity.Via;
import com.railfix.dam.entity.enums.Rol;
import java.math.BigDecimal;
import org.springframework.stereotype.Service;

@Service
public class OperarioIncidenciaValidator {

    public boolean isOperarioActivo(Usuario usuario) {
        return usuario.getActivo() && usuario.getRol() == Rol.OPERARIO;
    }

    public boolean viaPerteneceALinea(Via via, Linea linea) {
        return via.getLinea().getIdLinea().equals(linea.getIdLinea());
    }

    public boolean puntoKilometricoDentroDeLinea(CreateIncidenciaRequest request, Linea linea) {
        BigDecimal puntoKilometrico = request.getPuntoKilometrico();

        return puntoKilometrico.compareTo(linea.getPkInicial()) >= 0
            && puntoKilometrico.compareTo(linea.getPkFinal()) <= 0;
    }
}

