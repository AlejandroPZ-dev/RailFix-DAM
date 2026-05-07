package com.railfix.dam.dto;

public class LoginResponse {

    private Long idUsuario;
    private String nombre;
    private String apellidos;
    private String username;
    private String rol;

    public LoginResponse(Long idUsuario, String nombre, String apellidos, String username, String rol) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.username = username;
        this.rol = rol;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getUsername() {
        return username;
    }

    public String getRol() {
        return rol;
    }
}

