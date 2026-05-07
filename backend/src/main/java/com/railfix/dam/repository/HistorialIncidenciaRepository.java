package com.railfix.dam.repository;

import com.railfix.dam.entity.HistorialIncidencia;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistorialIncidenciaRepository extends JpaRepository<HistorialIncidencia, Long> {

    List<HistorialIncidencia> findByIncidenciaIdIncidenciaOrderByFechaAccionDesc(Long incidenciaId);
}

