package com.nacho.api.repository;

import com.nacho.api.model.Poliza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface PolizaRepository extends JpaRepository<Poliza, Long> {
    List<Poliza> findByUsuarioId(Long usuarioId);

@Query("SELECT p FROM Poliza p JOIN FETCH p.usuario")
List<Poliza> findAllWithUsuario();

}

