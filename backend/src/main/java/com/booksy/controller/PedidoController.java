package com.booksy.controller;

import com.booksy.model.Pedido;
import com.booksy.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
@Tag(name = "pedidos", description = "api para gestion de pedidos")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @Operation(summary = "crear nuevo pedido")
    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido, Authentication authentication) {
        String username = authentication != null ? authentication.getName() : null;
        Pedido nuevoPedido = pedidoService.crearPedido(pedido, username);
        return new ResponseEntity<>(nuevoPedido, HttpStatus.CREATED);
    }
    
    @Operation(summary = "obtener pedidos del usuario logueado")
    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<Pedido>> misPedidos(Authentication authentication) {
        if (authentication == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Pedido> pedidos = pedidoService.obtenerPedidosUsuario(authentication.getName());
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }
    
    @Operation(summary = "obtener todos los pedidos (solo admin)")
    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerTodos() {
        List<Pedido> pedidos = pedidoService.obtenerTodos();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }
}
