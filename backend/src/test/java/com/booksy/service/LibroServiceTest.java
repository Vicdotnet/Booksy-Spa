package com.booksy.service;

import com.booksy.model.Libro;
import com.booksy.repository.LibroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LibroServiceTest {

    @Mock
    private LibroRepository libroRepository;

    @InjectMocks
    private LibroService libroService;

    private Libro libroTest;

    @BeforeEach
    void setUp() {
        libroTest = new Libro();
        libroTest.setId(1L);
        libroTest.setTitulo("Cien Años de Soledad");
        libroTest.setAutor("Gabriel García Márquez");
        libroTest.setCategoria("novela");
        libroTest.setPrecio(18000);
        libroTest.setIcono("📚");
        libroTest.setImagen("https://example.com/imagen.jpg");
        libroTest.setDescripcion("Obra maestra del realismo mágico");
    }

    @Test
    void testCrearLibro() {
        // Given
        when(libroRepository.save(any(Libro.class))).thenReturn(libroTest);

        // When
        Libro resultado = libroService.crearLibro(libroTest);

        // Then
        assertNotNull(resultado);
        assertEquals("Cien Años de Soledad", resultado.getTitulo());
        assertEquals("Gabriel García Márquez", resultado.getAutor());
        verify(libroRepository, times(1)).save(any(Libro.class));
    }

    @Test
    void testListarTodos() {
        // Given
        Libro libro2 = new Libro();
        libro2.setId(2L);
        libro2.setTitulo("Don Quijote");
        libro2.setAutor("Miguel de Cervantes");
        libro2.setCategoria("novela");
        libro2.setPrecio(15000);

        List<Libro> libros = Arrays.asList(libroTest, libro2);
        when(libroRepository.findAll()).thenReturn(libros);

        // When
        List<Libro> resultado = libroService.listarTodos();

        // Then
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        verify(libroRepository, times(1)).findAll();
    }

    @Test
    void testBuscarPorId_Existe() {
        // Given
        when(libroRepository.findById(1L)).thenReturn(Optional.of(libroTest));

        // When
        Optional<Libro> resultado = libroService.buscarPorId(1L);

        // Then
        assertTrue(resultado.isPresent());
        assertEquals("Cien Años de Soledad", resultado.get().getTitulo());
        verify(libroRepository, times(1)).findById(1L);
    }

    @Test
    void testBuscarPorId_NoExiste() {
        // Given
        when(libroRepository.findById(999L)).thenReturn(Optional.empty());

        // When
        Optional<Libro> resultado = libroService.buscarPorId(999L);

        // Then
        assertFalse(resultado.isPresent());
        verify(libroRepository, times(1)).findById(999L);
    }

    @Test
    void testActualizarLibro_Exitoso() {
        // Given
        Libro libroActualizado = new Libro();
        libroActualizado.setTitulo("Cien Años de Soledad - Edición Especial");
        libroActualizado.setAutor("Gabriel García Márquez");
        libroActualizado.setCategoria("novela");
        libroActualizado.setPrecio(20000);
        libroActualizado.setIcono("📚");
        libroActualizado.setImagen("https://example.com/nueva-imagen.jpg");
        libroActualizado.setDescripcion("Edición especial");

        when(libroRepository.findById(1L)).thenReturn(Optional.of(libroTest));
        when(libroRepository.save(any(Libro.class))).thenReturn(libroTest);

        // When
        Libro resultado = libroService.actualizarLibro(1L, libroActualizado);

        // Then
        assertNotNull(resultado);
        verify(libroRepository, times(1)).findById(1L);
        verify(libroRepository, times(1)).save(any(Libro.class));
    }

    @Test
    void testActualizarLibro_NoExiste() {
        // Given
        when(libroRepository.findById(999L)).thenReturn(Optional.empty());

        // When
        Libro resultado = libroService.actualizarLibro(999L, libroTest);

        // Then
        assertNull(resultado);
        verify(libroRepository, times(1)).findById(999L);
        verify(libroRepository, never()).save(any(Libro.class));
    }

    @Test
    void testEliminarLibro_Exitoso() {
        // Given
        when(libroRepository.existsById(1L)).thenReturn(true);
        doNothing().when(libroRepository).deleteById(1L);

        // When
        boolean resultado = libroService.eliminarLibro(1L);

        // Then
        assertTrue(resultado);
        verify(libroRepository, times(1)).existsById(1L);
        verify(libroRepository, times(1)).deleteById(1L);
    }

    @Test
    void testEliminarLibro_NoExiste() {
        // Given
        when(libroRepository.existsById(999L)).thenReturn(false);

        // When
        boolean resultado = libroService.eliminarLibro(999L);

        // Then
        assertFalse(resultado);
        verify(libroRepository, times(1)).existsById(999L);
        verify(libroRepository, never()).deleteById(anyLong());
    }

    @Test
    void testBuscarPorCategoria() {
        // Given
        Libro libro2 = new Libro();
        libro2.setId(2L);
        libro2.setTitulo("El amor en los tiempos del cólera");
        libro2.setAutor("Gabriel García Márquez");
        libro2.setCategoria("novela");
        libro2.setPrecio(16000);

        List<Libro> librosNovela = Arrays.asList(libroTest, libro2);
        when(libroRepository.findByCategoria("novela")).thenReturn(librosNovela);

        // When
        List<Libro> resultado = libroService.buscarPorCategoria("novela");

        // Then
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertTrue(resultado.stream().allMatch(l -> l.getCategoria().equals("novela")));
        verify(libroRepository, times(1)).findByCategoria("novela");
    }

    @Test
    void testCrearLibro_ValidacionPrecio() {
        // Given
        libroTest.setPrecio(25000);
        when(libroRepository.save(any(Libro.class))).thenReturn(libroTest);

        // When
        Libro resultado = libroService.crearLibro(libroTest);

        // Then
        assertNotNull(resultado);
        assertTrue(resultado.getPrecio() > 0);
        verify(libroRepository, times(1)).save(any(Libro.class));
    }
}
