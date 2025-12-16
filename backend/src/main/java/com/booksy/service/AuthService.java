package com.booksy.service;

import com.booksy.dto.LoginRequest;
import com.booksy.dto.LoginResponse;
import com.booksy.model.Usuario;
import com.booksy.repository.UsuarioRepository;
import com.booksy.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElse(null);
        
        if (usuario != null && passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            String token = jwtUtil.generateToken(usuario.getUsername(), usuario.getRol());
            return new LoginResponse(token, usuario.getUsername(), usuario.getRol(), "login exitoso");
        }
        
        return new LoginResponse(null, null, null, "credenciales invalidas");
    }
    
    public Usuario registrarUsuario(Usuario usuario) {
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            return null;
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }
}
