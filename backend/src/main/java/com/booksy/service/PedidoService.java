package com.booksy.service;

import com.booksy.model.Pedido;
import com.booksy.model.Usuario;
import com.booksy.repository.PedidoRepository;
import com.booksy.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public Pedido crearPedido(Pedido pedido, String username) {
        Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);
        
        if (usuario != null) {
            // actualizar datos del usuario si cambiaron
            usuario.setNombreCompleto(pedido.getNombreCompleto());
            usuario.setDireccion(pedido.getDireccion());
            usuario.setTelefono(pedido.getTelefono());
            usuarioRepository.save(usuario);
            
            pedido.setUsuario(usuario);
        }
        
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado("pendiente");
        
        return pedidoRepository.save(pedido);
    }
    
    public List<Pedido> obtenerPedidosUsuario(String username) {
        Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);
        if (usuario != null) {
            return pedidoRepository.findByUsuarioId(usuario.getId());
        }
        return List.of();
    }
    
    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }
}
