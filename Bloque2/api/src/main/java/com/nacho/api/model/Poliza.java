package com.nacho.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Poliza {

    @Id
    @Column(name = "poliza_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String numeroPoliza;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private String tipoPoliza;

    private BigDecimal prima;

    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario; 
}
