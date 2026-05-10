package com.railfix.dam.repository;

import com.railfix.dam.entity.AdjuntoIncidencia;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdjuntoIncidenciaRepository extends JpaRepository<AdjuntoIncidencia, Long> {

    List<AdjuntoIncidencia> findByIncidenciaIdIncidenciaOrderByFechaSubidaDesc(Long incidenciaId);

    long countByIncidenciaIdIncidencia(Long incidenciaId);
}
