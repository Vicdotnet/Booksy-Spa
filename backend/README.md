# 🔧 Backend - Booksy API

## Evaluación 3 (40%)

API REST con Spring Boot, JWT y base de datos H2.

### Estructura
```
src/main/java/com/booksy/
├── BooksyApplication.java      # Clase principal
├── config/                     # Configuración
├── model/                      # Entidades JPA
├── repository/                 # Repositories
├── service/                    # Lógica de negocio
├── controller/                 # Endpoints REST
├── security/                   # JWT y seguridad
└── dto/                        # Data Transfer Objects
```

### Tecnologías
- Spring Boot 3.2
- Spring Security
- JWT (JSON Web Tokens)
- H2 Database (en memoria)
- JPA/Hibernate
- Swagger/OpenAPI
- Maven

### Ejecutar
```bash
mvn spring-boot:run
```

### Acceso
- API: http://localhost:8080/api
- Swagger: http://localhost:8080/swagger-ui.html
- H2 Console: http://localhost:8080/h2-console

### Endpoints Principales

#### Autenticación
- POST `/api/auth/login` - Login
- POST `/api/auth/registro` - Registro

#### Libros
- GET `/api/libros` - Listar todos (público)
- GET `/api/libros/{id}` - Buscar por ID (público)
- GET `/api/libros/categoria/{cat}` - Filtrar (público)
- POST `/api/libros` - Crear (requiere ADMIN)
- PUT `/api/libros/{id}` - Actualizar (requiere ADMIN)
- DELETE `/api/libros/{id}` - Eliminar (requiere ADMIN)

### Credenciales
- **Admin:** admin / admin123
- **User:** user / user123

### Datos Iniciales
Al iniciar, se crean automáticamente:
- 2 usuarios (admin y user)
- 12 libros de prueba
