package com.booksy.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "libros")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Libro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "el titulo es obligatorio")
    @Column(nullable = false)
    private String titulo;
    
    @NotBlank(message = "el autor es obligatorio")
    @Column(nullable = false)
    private String autor;
    
    @NotBlank(message = "la categoria es obligatoria")
    @Column(nullable = false)
    private String categoria;
    
    @NotNull(message = "el precio es obligatorio")
    @Min(value = 0, message = "el precio debe ser mayor a 0")
    @Column(nullable = false)
    private Integer precio;
    
    private String icono;
    
    @Column(length = 500)
    private String imagen;
    
    @Column(length = 1000)
    private String descripcion;
}
