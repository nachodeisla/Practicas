package com.nacho.api.mapper;

import com.nacho.api.dto.UsuarioDTO;
import com.nacho.api.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-10T15:17:04+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioDTO toDto(Usuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        UsuarioDTO usuarioDTO = new UsuarioDTO();

        usuarioDTO.setId( usuario.getid() );
        usuarioDTO.setName( usuario.getName() );
        usuarioDTO.setSurname( usuario.getSurname() );
        usuarioDTO.setEmail( usuario.getEmail() );
        usuarioDTO.setCreatedAt( usuario.getCreatedAt() );
        usuarioDTO.setLastAccessAt( usuario.getLastAccessAt() );

        return usuarioDTO;
    }

    @Override
    public Usuario toEntity(UsuarioDTO usuarioDTO) {
        if ( usuarioDTO == null ) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setId( usuarioDTO.getId() );
        usuario.setName( usuarioDTO.getName() );
        usuario.setSurname( usuarioDTO.getSurname() );
        usuario.setEmail( usuarioDTO.getEmail() );

        return usuario;
    }
}
