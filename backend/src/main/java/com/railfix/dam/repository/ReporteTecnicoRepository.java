package com.railfix.dam.repository;

import com.railfix.dam.entity.ReporteTecnico;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ReporteTecnicoRepository extends JpaRepository<ReporteTecnico, Long>, JpaSpecificationExecutor<ReporteTecnico> {

    List<ReporteTecnico> findAllByOrderByFechaReporteDesc();

    List<ReporteTecnico> findByIncidenciaIdIncidencia(Long incidenciaId);

    List<ReporteTecnico> findByTecnicoIdUsuario(Long tecnicoId);

    List<ReporteTecnico> findByTecnicoIdUsuarioAndIncidenciaIdIncidenciaOrderByFechaReporteDesc(
        Long tecnicoId,
        Long incidenciaId
    );
}
