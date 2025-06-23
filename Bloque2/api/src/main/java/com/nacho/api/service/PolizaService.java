package com.nacho.api.service;

import com.nacho.api.dto.PolizaDTO;

import java.util.List;

public interface PolizaService {
    PolizaDTO crearPoliza(PolizaDTO dto);
    List<PolizaDTO> obtenerTodas();
    PolizaDTO obtenerPorId(Long id);
    void eliminarPorId(Long id);
    PolizaDTO actualizarPoliza(Long id, PolizaDTO dto);
    List<PolizaDTO> obtenerPorUsuarioId(Long usuarioId);
    PolizaDTO crearPolizaParaUsuario(Long usuarioId, PolizaDTO dto);
}


