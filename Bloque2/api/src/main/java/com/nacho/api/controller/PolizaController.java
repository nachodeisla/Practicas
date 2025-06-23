package com.nacho.api.controller;

import com.nacho.api.dto.PolizaDTO;
import com.nacho.api.service.PolizaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/polizas")
public class PolizaController {

    private final PolizaService servicio;

    @PostMapping
    public ResponseEntity<PolizaDTO> crear(@RequestBody PolizaDTO dto) {
        return ResponseEntity.status(201).body(servicio.crearPoliza(dto));
    }

    @GetMapping
    public List<PolizaDTO> obtenerTodas() {
        return servicio.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PolizaDTO> obtenerPorId(@PathVariable Long id) {
        PolizaDTO dto = servicio.obtenerPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PolizaDTO> actualizar(@PathVariable Long id, @RequestBody PolizaDTO dto) {
        return ResponseEntity.ok(servicio.actualizarPoliza(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicio.eliminarPorId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<PolizaDTO> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return servicio.obtenerPorUsuarioId(usuarioId);
    }

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<PolizaDTO> crearParaUsuario(@PathVariable Long usuarioId, @RequestBody PolizaDTO dto) {
        return ResponseEntity.status(201).body(servicio.crearPolizaParaUsuario(usuarioId, dto));
    }
}



