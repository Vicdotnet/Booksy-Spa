package com.booksy.service;

import com.booksy.model.Libro;
import com.booksy.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LibroService {
    
    @Autowired
    private LibroRepository libroRepository;
    
    // crear libro
    public Libro crearLibro(Libro libro) {
        return libroRepository.save(libro);
    }
    
    // listar todos los libros
    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }
    
    // buscar libro por id
    public Optional<Libro> buscarPorId(Long id) {
        return libroRepository.findById(id);
    }
    
    // actualizar libro
    public Libro actualizarLibro(Long id, Libro libroActualizado) {
        Optional<Libro> libroExistente = libroRepository.findById(id);
        if (libroExistente.isPresent()) {
            Libro libro = libroExistente.get();
            libro.setTitulo(libroActualizado.getTitulo());
            libro.setAutor(libroActualizado.getAutor());
            libro.setCategoria(libroActualizado.getCategoria());
            libro.setPrecio(libroActualizado.getPrecio());
            libro.setIcono(libroActualizado.getIcono());
            libro.setImagen(libroActualizado.getImagen());
            libro.setDescripcion(libroActualizado.getDescripcion());
            return libroRepository.save(libro);
        }
        return null;
    }
    
    // eliminar libro
    public boolean eliminarLibro(Long id) {
        if (libroRepository.existsById(id)) {
            libroRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // buscar por categoria
    public List<Libro> buscarPorCategoria(String categoria) {
        return libroRepository.findByCategoria(categoria);
    }
}
