package com.booksy.repository;

import com.booksy.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {
    // buscar libros por categoria
    List<Libro> findByCategoria(String categoria);
    
    // buscar libros por titulo
    List<Libro> findByTituloContainingIgnoreCase(String titulo);
}
