package com.booksy.controller;

import com.booksy.dto.LoginRequest;
import com.booksy.dto.LoginResponse;
import com.booksy.model.Usuario;
import com.booksy.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "autenticacion", description = "api para autenticacion y registro")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Operation(summary = "login de usuario")
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        if (response.getToken() != null) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
    
    @Operation(summary = "registrar nuevo usuario")
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = authService.registrarUsuario(usuario);
        if (nuevoUsuario != null) {
            return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
        }
        return new ResponseEntity<>("el usuario ya existe", HttpStatus.BAD_REQUEST);
    }
}
