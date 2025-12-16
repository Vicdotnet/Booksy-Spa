package com.booksy.controller;

import com.booksy.model.Libro;
import com.booksy.service.LibroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "*")
@Tag(name = "libros", description = "api para gestion de libros")
public class LibroController {
    
    @Autowired
    private LibroService libroService;
    
    @Operation(summary = "crear un nuevo libro")
    @PostMapping
    public ResponseEntity<?> crearLibro(@Valid @RequestBody Libro libro) {
        try {
            Libro nuevoLibro = libroService.crearLibro(libro);
            return new ResponseEntity<>(nuevoLibro, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al crear libro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Operation(summary = "listar todos los libros")
    @GetMapping
    public ResponseEntity<List<Libro>> listarTodos() {
        List<Libro> libros = libroService.listarTodos();
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }
    
    @Operation(summary = "buscar libro por id")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Libro> libro = libroService.buscarPorId(id);
        if (libro.isPresent()) {
            return new ResponseEntity<>(libro.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("libro no encontrado", HttpStatus.NOT_FOUND);
    }
    
    @Operation(summary = "actualizar un libro")
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarLibro(@PathVariable Long id, @Valid @RequestBody Libro libro) {
        try {
            Libro libroActualizado = libroService.actualizarLibro(id, libro);
            if (libroActualizado != null) {
                return new ResponseEntity<>(libroActualizado, HttpStatus.OK);
            }
            return new ResponseEntity<>("libro no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al actualizar libro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Operation(summary = "eliminar un libro")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarLibro(@PathVariable Long id) {
        boolean eliminado = libroService.eliminarLibro(id);
        if (eliminado) {
            return new ResponseEntity<>("libro eliminado correctamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("libro no encontrado", HttpStatus.NOT_FOUND);
    }
    
    @Operation(summary = "buscar libros por categoria")
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Libro>> buscarPorCategoria(@PathVariable String categoria) {
        List<Libro> libros = libroService.buscarPorCategoria(categoria);
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }
}
