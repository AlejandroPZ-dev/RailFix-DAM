package com.railfix.dam.service;

import com.railfix.dam.dto.LoginRequest;
import com.railfix.dam.dto.LoginResponse;
import com.railfix.dam.entity.Usuario;
import com.railfix.dam.repository.UsuarioRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<LoginResponse> login(LoginRequest request) {
        return usuarioRepository.findByUsername(request.getUsername())
            .filter(Usuario::getActivo)
            .filter(usuario -> matchesPassword(request.getPassword(), usuario.getPasswordHash()))
            .map(this::toResponse);
    }

    private boolean matchesPassword(String rawPassword, String storedHash) {
        return sha256(rawPassword).equalsIgnoreCase(storedHash);
    }

    private String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 algorithm is not available", exception);
        }
    }

    private LoginResponse toResponse(Usuario usuario) {
        return new LoginResponse(
            usuario.getIdUsuario(),
            usuario.getNombre(),
            usuario.getApellidos(),
            usuario.getUsername(),
            usuario.getRol().name()
        );
    }
}

