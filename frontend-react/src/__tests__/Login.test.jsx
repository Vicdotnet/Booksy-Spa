import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import { authService } from '../services/api';

// Mock del servicio de autenticación
jest.mock('../services/api', () => ({
  authService: {
    login: jest.fn(),
  }
}));

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renderiza formulario de login correctamente', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  test('muestra error cuando los campos están vacíos', async () => {
    authService.login.mockRejectedValue({
      response: { data: 'Error' }
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error al iniciar sesion/i)).toBeInTheDocument();
    });
  });

  test('login exitoso como admin redirige a /admin', async () => {
    const mockResponse = {
      data: {
        token: 'fake-jwt-token',
        username: 'admin',
        rol: 'ADMIN'
      }
    };
    authService.login.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
      target: { value: 'admin' }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: 'admin123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(localStorage.getItem('username')).toBe('admin');
      expect(localStorage.getItem('rol')).toBe('ADMIN');
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  test('login exitoso como usuario redirige a catalogo', async () => {
    const mockResponse = {
      data: {
        token: 'fake-jwt-token',
        username: 'user',
        rol: 'USER'
      }
    };
    authService.login.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
      target: { value: 'user' }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: 'user123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/catalogo');
    });
  });

  test('muestra error cuando las credenciales son incorrectas', async () => {
    authService.login.mockRejectedValue({
      response: { data: 'Credenciales inválidas' }
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
      target: { value: 'wrong' }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: 'wrong' }
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(screen.getByText(/error al iniciar sesion/i)).toBeInTheDocument();
    });
  });
});
