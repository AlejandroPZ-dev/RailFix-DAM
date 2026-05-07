package com.railfix.dam.repository;

import com.railfix.dam.entity.Via;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViaRepository extends JpaRepository<Via, Long> {

    List<Via> findByLinea_IdLinea(Long lineaId);
}
