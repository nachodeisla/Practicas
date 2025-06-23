package com.nacho.api.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PolizaDTO {

    private Long id;
    private String numeroPoliza;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String tipoPoliza;
    private BigDecimal prima;
    private String estado;
    private Long usuarioId;
}
