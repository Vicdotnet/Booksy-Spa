import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// crear instancia de axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// interceptor para agregar token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// servicios de autenticacion
export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    registro: (usuario) => api.post('/auth/registro', usuario),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('rol');
    },
    getCurrentUser: () => {
        return {
            token: localStorage.getItem('token'),
            username: localStorage.getItem('username'),
            rol: localStorage.getItem('rol')
        };
    }
};

// servicios de libros
export const libroService = {
    getAll: () => api.get('/libros'),
    getById: (id) => api.get(`/libros/${id}`),
    getByCategoria: (categoria) => api.get(`/libros/categoria/${categoria}`),
    create: (libro) => api.post('/libros', libro),
    update: (id, libro) => api.put(`/libros/${id}`, libro),
    delete: (id) => api.delete(`/libros/${id}`)
};

// servicios de pedidos
export const pedidoService = {
    crear: (pedido) => api.post('/pedidos', pedido),
    misPedidos: () => api.get('/pedidos/mis-pedidos'),
    todos: () => api.get('/pedidos')
};

export default api;
