package com.railfix.dam.repository;

import com.railfix.dam.entity.Usuario;
import com.railfix.dam.entity.enums.Rol;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);

    List<Usuario> findByRol(Rol rol);
}
