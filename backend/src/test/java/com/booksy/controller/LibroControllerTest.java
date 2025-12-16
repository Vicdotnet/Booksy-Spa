package com.booksy.controller;

import com.booksy.model.Libro;
import com.booksy.service.LibroService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class LibroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LibroService libroService;

    @Autowired
    private ObjectMapper objectMapper;

    private Libro libroTest;

    @BeforeEach
    void setUp() {
        libroTest = new Libro();
        libroTest.setId(1L);
        libroTest.setTitulo("Test Book");
        libroTest.setAutor("Test Author");
        libroTest.setCategoria("novela");
        libroTest.setPrecio(15000);
        libroTest.setIcono("📚");
    }

    @Test
    void testListarTodos_SinAutenticacion() throws Exception {
        // Given
        when(libroService.listarTodos()).thenReturn(Arrays.asList(libroTest));

        // When & Then
        mockMvc.perform(get("/api/libros"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].titulo").value("Test Book"));

        verify(libroService, times(1)).listarTodos();
    }

    @Test
    void testBuscarPorId_Existe() throws Exception {
        // Given
        when(libroService.buscarPorId(1L)).thenReturn(Optional.of(libroTest));

        // When & Then
        mockMvc.perform(get("/api/libros/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Test Book"))
                .andExpect(jsonPath("$.autor").value("Test Author"));

        verify(libroService, times(1)).buscarPorId(1L);
    }

    @Test
    void testBuscarPorId_NoExiste() throws Exception {
        // Given
        when(libroService.buscarPorId(999L)).thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(get("/api/libros/999"))
                .andExpect(status().isNotFound());

        verify(libroService, times(1)).buscarPorId(999L);
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testCrearLibro_ConRolAdmin() throws Exception {
        // Given
        when(libroService.crearLibro(any(Libro.class))).thenReturn(libroTest);

        // When & Then
        mockMvc.perform(post("/api/libros")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(libroTest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("Test Book"));

        verify(libroService, times(1)).crearLibro(any(Libro.class));
    }

    @Test
    void testCrearLibro_SinAutenticacion() throws Exception {
        // When & Then
        mockMvc.perform(post("/api/libros")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(libroTest)))
                .andExpect(status().isForbidden());

        verify(libroService, never()).crearLibro(any(Libro.class));
    }

    @Test
    @WithMockUser(authorities = "USER")
    void testCrearLibro_ConRolUser() throws Exception {
        // When & Then
        mockMvc.perform(post("/api/libros")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(libroTest)))
                .andExpect(status().isForbidden());

        verify(libroService, never()).crearLibro(any(Libro.class));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testActualizarLibro_ConRolAdmin() throws Exception {
        // Given
        when(libroService.actualizarLibro(eq(1L), any(Libro.class))).thenReturn(libroTest);

        // When & Then
        mockMvc.perform(put("/api/libros/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(libroTest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Test Book"));

        verify(libroService, times(1)).actualizarLibro(eq(1L), any(Libro.class));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testActualizarLibro_NoExiste() throws Exception {
        // Given
        when(libroService.actualizarLibro(eq(999L), any(Libro.class))).thenReturn(null);

        // When & Then
        mockMvc.perform(put("/api/libros/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(libroTest)))
                .andExpect(status().isNotFound());

        verify(libroService, times(1)).actualizarLibro(eq(999L), any(Libro.class));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testEliminarLibro_Exitoso() throws Exception {
        // Given
        when(libroService.eliminarLibro(1L)).thenReturn(true);

        // When & Then
        mockMvc.perform(delete("/api/libros/1"))
                .andExpect(status().isOk());

        verify(libroService, times(1)).eliminarLibro(1L);
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testEliminarLibro_NoExiste() throws Exception {
        // Given
        when(libroService.eliminarLibro(999L)).thenReturn(false);

        // When & Then
        mockMvc.perform(delete("/api/libros/999"))
                .andExpect(status().isNotFound());

        verify(libroService, times(1)).eliminarLibro(999L);
    }

    @Test
    void testBuscarPorCategoria() throws Exception {
        // Given
        when(libroService.buscarPorCategoria("novela")).thenReturn(Arrays.asList(libroTest));

        // When & Then
        mockMvc.perform(get("/api/libros/categoria/novela"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].categoria").value("novela"));

        verify(libroService, times(1)).buscarPorCategoria("novela");
    }
}
