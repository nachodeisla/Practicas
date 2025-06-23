package com.nacho.api.service.impl;

import com.nacho.api.dto.PolizaDTO;
import com.nacho.api.mapper.PolizaMapper;
import com.nacho.api.model.Poliza;
import com.nacho.api.model.Usuario;
import com.nacho.api.repository.PolizaRepository;
import com.nacho.api.repository.UsuarioRepository;
import com.nacho.api.service.PolizaService;
import lombok.RequiredArgsConstructor;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PolizaServiceImpl implements PolizaService {

    private final PolizaRepository repositorio;
    private final PolizaMapper mapper;
     private final UsuarioRepository usuarioRepository;


@Override
public PolizaDTO crearPoliza(PolizaDTO dto) {
    Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID " + dto.getUsuarioId()));



    Poliza entidad = mapper.toEntity(dto);
    entidad.setUsuario(usuario); 


    return mapper.toDTO(repositorio.save(entidad));
}







@Override
public List<PolizaDTO> obtenerTodas() {
    return mapper.toDTOList(repositorio.findAllWithUsuario());
}


    @Override
    public PolizaDTO obtenerPorId(Long id) {
        return repositorio.findById(id).map(mapper::toDTO).orElse(null);
    }

@Override
public void eliminarPorId(Long id) {
    try {
        repositorio.deleteById(id);
    } catch (EmptyResultDataAccessException e) {
        throw new RuntimeException("La póliza con ID " + id + " no existe.");
    } catch (Exception e) {
        throw new RuntimeException("Error al eliminar la póliza con ID " + id + ": " + e.getMessage(), e);
    }
}





@Override
public PolizaDTO actualizarPoliza(Long id, PolizaDTO dto) {
    Poliza actual = repositorio.findById(id)
        .orElseThrow(() -> new RuntimeException("Póliza no encontrada con ID " + id));

    Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID " + dto.getUsuarioId()));

    Poliza actualizado = mapper.toEntity(dto);
    actualizado.setId(id);
    actualizado.setUsuario(usuario); 

    return mapper.toDTO(repositorio.save(actualizado));
}





    @Override
    public List<PolizaDTO> obtenerPorUsuarioId(Long usuarioId) {
        return mapper.toDTOList(repositorio.findByUsuarioId(usuarioId));
    }

    @Override
    public PolizaDTO crearPolizaParaUsuario(Long usuarioId, PolizaDTO dto) {
        dto.setUsuarioId(usuarioId);
        return crearPoliza(dto);
    }
}


