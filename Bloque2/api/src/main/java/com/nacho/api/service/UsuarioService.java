package com.nacho.api.service;

import com.nacho.api.dto.UsuarioDTO;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO);

    List<UsuarioDTO> obtenerTodos();

    Optional<UsuarioDTO> obtenerPorId(Long id);

    void eliminarUsuario(Long id);
}
