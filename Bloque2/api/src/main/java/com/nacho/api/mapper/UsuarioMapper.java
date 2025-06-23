package com.nacho.api.mapper;

import com.nacho.api.dto.UsuarioDTO;
import com.nacho.api.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioDTO toDto(Usuario usuario);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "lastAccessAt", ignore = true)
    @Mapping(target = "password", ignore = true)
    Usuario toEntity(UsuarioDTO usuarioDTO);
}



