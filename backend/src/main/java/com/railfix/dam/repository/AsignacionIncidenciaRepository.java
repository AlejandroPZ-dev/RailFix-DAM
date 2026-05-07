package com.railfix.dam.repository;

import com.railfix.dam.entity.AsignacionIncidencia;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AsignacionIncidenciaRepository extends JpaRepository<AsignacionIncidencia, Long> {

    List<AsignacionIncidencia> findByIncidenciaIdIncidencia(Long incidenciaId);

    List<AsignacionIncidencia> findByTecnicoIdUsuario(Long tecnicoId);

    Optional<AsignacionIncidencia> findByIncidenciaIdIncidenciaAndTecnicoIdUsuario(Long incidenciaId, Long tecnicoId);

    Optional<AsignacionIncidencia> findByIdAsignacionAndIncidenciaIdIncidencia(Long idAsignacion, Long incidenciaId);
}
