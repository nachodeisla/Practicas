package com.nacho.api.mapper;

import com.nacho.api.dto.PolizaDTO;
import com.nacho.api.model.Poliza;
import com.nacho.api.model.Usuario;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-10T15:17:04+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class PolizaMapperImpl implements PolizaMapper {

    @Override
    public PolizaDTO toDTO(Poliza poliza) {
        if ( poliza == null ) {
            return null;
        }

        PolizaDTO.PolizaDTOBuilder polizaDTO = PolizaDTO.builder();

        polizaDTO.usuarioId( polizaUsuarioId( poliza ) );
        polizaDTO.estado( poliza.getEstado() );
        polizaDTO.fechaFin( poliza.getFechaFin() );
        polizaDTO.fechaInicio( poliza.getFechaInicio() );
        polizaDTO.id( poliza.getId() );
        polizaDTO.numeroPoliza( poliza.getNumeroPoliza() );
        polizaDTO.prima( poliza.getPrima() );
        polizaDTO.tipoPoliza( poliza.getTipoPoliza() );

        return polizaDTO.build();
    }

    @Override
    public Poliza toEntity(PolizaDTO polizaDTO) {
        if ( polizaDTO == null ) {
            return null;
        }

        Poliza.PolizaBuilder poliza = Poliza.builder();

        poliza.estado( polizaDTO.getEstado() );
        poliza.fechaFin( polizaDTO.getFechaFin() );
        poliza.fechaInicio( polizaDTO.getFechaInicio() );
        poliza.id( polizaDTO.getId() );
        poliza.numeroPoliza( polizaDTO.getNumeroPoliza() );
        poliza.prima( polizaDTO.getPrima() );
        poliza.tipoPoliza( polizaDTO.getTipoPoliza() );

        return poliza.build();
    }

    @Override
    public List<PolizaDTO> toDTOList(List<Poliza> lista) {
        if ( lista == null ) {
            return null;
        }

        List<PolizaDTO> list = new ArrayList<PolizaDTO>( lista.size() );
        for ( Poliza poliza : lista ) {
            list.add( toDTO( poliza ) );
        }

        return list;
    }

    private Long polizaUsuarioId(Poliza poliza) {
        if ( poliza == null ) {
            return null;
        }
        Usuario usuario = poliza.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        Long id = usuario.getid();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
