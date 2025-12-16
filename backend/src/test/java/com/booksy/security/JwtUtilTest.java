package com.booksy.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        // Configurar valores de prueba usando ReflectionTestUtils
        ReflectionTestUtils.setField(jwtUtil, "secret", "miClaveSecretaSuperSeguraParaJWTDeAlMenos256Bits12345678901234567890");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86400000L); // 24 horas
    }

    @Test
    void testGenerarToken() {
        // When
        String token = jwtUtil.generateToken("testuser", "USER");

        // Then
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void testExtraerUsername() {
        // Given
        String token = jwtUtil.generateToken("testuser", "USER");

        // When
        String username = jwtUtil.getUsernameFromToken(token);

        // Then
        assertEquals("testuser", username);
    }

    @Test
    void testExtraerRol() {
        // Given
        String token = jwtUtil.generateToken("testuser", "USER");

        // When
        String rol = jwtUtil.getRolFromToken(token);

        // Then
        assertEquals("USER", rol);
    }

    @Test
    void testValidarToken_TokenValido() {
        // Given
        String token = jwtUtil.generateToken("testuser", "USER");

        // When
        boolean esValido = jwtUtil.validateToken(token);

        // Then
        assertTrue(esValido);
    }

    @Test
    void testValidarToken_TokenInvalido() {
        // Given
        String tokenInvalido = "tokeninvalidoquenoexiste.asdasd.qweqwe";

        // When
        boolean esValido = jwtUtil.validateToken(tokenInvalido);

        // Then
        assertFalse(esValido);
    }

    @Test
    void testGenerarTokenAdmin() {
        // Given
        String token = jwtUtil.generateToken("admin", "ADMIN");

        // When
        String username = jwtUtil.getUsernameFromToken(token);
        String rol = jwtUtil.getRolFromToken(token);

        // Then
        assertEquals("admin", username);
        assertEquals("ADMIN", rol);
    }

    @Test
    void testMultiplesTokens() {
        // Given
        String token1 = jwtUtil.generateToken("user1", "USER");
        String token2 = jwtUtil.generateToken("user2", "ADMIN");

        // When & Then
        assertEquals("user1", jwtUtil.getUsernameFromToken(token1));
        assertEquals("USER", jwtUtil.getRolFromToken(token1));
        
        assertEquals("user2", jwtUtil.getUsernameFromToken(token2));
        assertEquals("ADMIN", jwtUtil.getRolFromToken(token2));
    }
}
