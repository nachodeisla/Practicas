package com.nacho.api.mapper;

import com.nacho.api.dto.PolizaDTO;
import com.nacho.api.model.Poliza;
import com.nacho.api.model.Usuario;

import java.util.List;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PolizaMapper {

    @Mapping(source = "usuario.id", target = "usuarioId")
    PolizaDTO toDTO(Poliza poliza);

    Poliza toEntity(PolizaDTO polizaDTO);

    List<PolizaDTO> toDTOList(List<Poliza> lista);

    default Usuario mapUsuarioId(Long usuarioId) {
        if (usuarioId == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        return usuario;
    }


}
