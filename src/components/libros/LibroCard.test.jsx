import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LibroCard from './LibroCard';

// test para la tarjeta del libro
// esto lo pide la rubrica
describe('LibroCard Component', () => {

    // test sugerido por la rubrica (nombre y click) 
    test('muestra el titulo y llama a onAdd al hacer click', async () => {
        
        // funcion mock para probar el click
        const onAddMock = jest.fn();
        
        const libroMock = {
            id: 1,
            titulo: 'Libro de Prueba',
            autor: 'Autor Test',
            precio: 1000
        };

        render(<LibroCard libro={libroMock} onAdd={onAddMock} />);

        // 1. revisa que el titulo este
        expect(screen.getByText(/libro de prueba/i)).toBeInTheDocument();

        // 2. simula el click en "agregar"
        await userEvent.click(screen.getByRole('button', { name: /agregar/i }));

        // 3. revisa que la funcion onAddMock fue llamada 1 vez
        expect(onAddMock).toHaveBeenCalledTimes(1);
    });

});