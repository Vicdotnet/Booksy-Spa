package com.booksy.config;

import com.booksy.model.Libro;
import com.booksy.model.Usuario;
import com.booksy.repository.LibroRepository;
import com.booksy.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private LibroRepository libroRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // crear usuarios de prueba
        Usuario admin = new Usuario();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRol("ADMIN");
        admin.setEmail("admin@booksy.cl");
        usuarioRepository.save(admin);
        
        Usuario user = new Usuario();
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setRol("USER");
        user.setEmail("user@booksy.cl");
        usuarioRepository.save(user);
        
        // crear libros de prueba con imagenes
        Libro libro1 = new Libro(null, "cien años de soledad", "gabriel garcia marquez", "novela", 15990, "📖", "https://images.cdn1.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg", "obra maestra del realismo magico");
        libroRepository.save(libro1);
        
        Libro libro2 = new Libro(null, "el principito", "antoine de saint exupery", "infantil", 8990, "🌟", "https://images.cdn3.buscalibre.com/fit-in/360x360/dc/12/dc12a93fc08e81c356b5c1564393bcef.jpg", "clasico de la literatura infantil");
        libroRepository.save(libro2);
        
        Libro libro3 = new Libro(null, "sapiens", "yuval noah harari", "divulgacion", 18990, "🧠", "https://images.cdn2.buscalibre.com/fit-in/360x360/5d/8d/5d8d3ee1be6b8e9b36d4e4aa9a6c7507.jpg", "historia de la humanidad");
        libroRepository.save(libro3);
        
        Libro libro4 = new Libro(null, "1984", "george orwell", "novela", 12990, "📕", "https://images.cdn3.buscalibre.com/fit-in/360x360/ee/e6/eee638bb0ad93c67ddcc573c839de05e.jpg", "distopia clasica");
        libroRepository.save(libro4);
        
        Libro libro5 = new Libro(null, "donde viven los monstruos", "maurice sendak", "infantil", 9990, "👹", "https://images.cdn2.buscalibre.com/fit-in/360x360/ff/17/ff17c0b7d8a3ed17e8d0c41d13c3c7e0.jpg", "aventura infantil ilustrada");
        libroRepository.save(libro5);
        
        Libro libro6 = new Libro(null, "breve historia del tiempo", "stephen hawking", "divulgacion", 16990, "🌌", "https://images.cdn1.buscalibre.com/fit-in/360x360/d5/5e/d55e4a0a1a3c5a8fb7e9b2c4d6f8a0b1.jpg", "cosmologia y fisica");
        libroRepository.save(libro6);
        
        Libro libro7 = new Libro(null, "rayuela", "julio cortazar", "novela", 14990, "📗", "https://images.cdn3.buscalibre.com/fit-in/360x360/a1/92/a192e4d5f7c8b9a3e6d4f2c1b8a5e7d9.jpg", "novela experimental");
        libroRepository.save(libro7);
        
        Libro libro8 = new Libro(null, "el patito feo", "hans christian andersen", "infantil", 7990, "🦆", "https://images.cdn2.buscalibre.com/fit-in/360x360/b3/c4/b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8.jpg", "cuento clasico infantil");
        libroRepository.save(libro8);
        
        Libro libro9 = new Libro(null, "cosmos", "carl sagan", "divulgacion", 19990, "🚀", "https://images.cdn1.buscalibre.com/fit-in/360x360/c5/d6/c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0.jpg", "exploracion del universo");
        libroRepository.save(libro9);
        
        Libro libro10 = new Libro(null, "pedro paramo", "juan rulfo", "novela", 11990, "📘", "https://images.cdn3.buscalibre.com/fit-in/360x360/d7/e8/d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2.jpg", "obra fundamental mexicana");
        libroRepository.save(libro10);
        
        Libro libro11 = new Libro(null, "la oruga muy hambrienta", "eric carle", "infantil", 8990, "🐛", "https://images.cdn2.buscalibre.com/fit-in/360x360/e9/f0/e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4.jpg", "libro ilustrado para niños");
        libroRepository.save(libro11);
        
        Libro libro12 = new Libro(null, "el gen egoista", "richard dawkins", "divulgacion", 17990, "🧬", "https://images.cdn1.buscalibre.com/fit-in/360x360/f1/a2/f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6.jpg", "evolucion y genetica");
        libroRepository.save(libro12);
        
        System.out.println("datos inicializados correctamente");
    }
}
