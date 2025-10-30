import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Catalogo from './Catalogo';

// mock del contexto
// para que no falle el useCart
jest.mock('../context/AppContext', () => ({
    useCart: () => ({ 
        addToCart: jest.fn(), // funcion simulada para agregar
        resetCart: jest.fn(), // funcion simulada para resetear
        cartCount: 0, // contador en 0
        isCartEmpty: true // carrito vacio
    }),
}));

// mock de los datos de libros
// para no depender del archivo real
jest.mock('../data/libros.mock', () => ({
    CATEGORIAS: ['Ficcion', 'Poesia'],
    LIBROS: [
        { id: 1, titulo: 'Libro de Ficcion', autor: 'Autor 1', precio: 1000, categoria: 'Ficcion' },
        { id: 2, titulo: 'Libro de Poesia', autor: 'Autor 2', precio: 2000, categoria: 'Poesia' }
    ]
}));


describe('Componente Catalogo', () => {

    test('se monta y muestra el titulo', () => {
        render(<Catalogo />);
        // buscamos el h2
        expect(screen.getByRole('heading', { name: /catálogo de libros/i })).toBeInTheDocument();
    });

    test('renderiza todas las tarjetas de libros del mock', () => {
        render(<Catalogo />);
        
        // revisa que los libros del mock esten
        expect(screen.getByText(/libro de ficcion/i)).toBeInTheDocument();
        expect(screen.getByText(/libro de poesia/i)).toBeInTheDocument();
    });

    test('los botones "agregar" aparecen en cada tarjeta', () => {
        render(<Catalogo />);
        
        // busca todos los botones "agregar"
        const botones = screen.getAllByRole('button', { name: /agregar/i });
        
        // deben ser 2 botones (uno por cada libro en el mock)
        expect(botones).toHaveLength(2);
    });

    test('filtra los libros al hacer click en una categoria', async () => {
        render(<Catalogo />);
        
        // al inicio estan los 2 libros
        expect(screen.getByText(/libro de ficcion/i)).toBeInTheDocument();
        expect(screen.getByText(/libro de poesia/i)).toBeInTheDocument();

        // click en el filtro "ficcion"
        await userEvent.click(screen.getByRole('button', { name: /^ficcion$/i }));
        // ahora solo debe estar el de ficcion
        expect(screen.getByText(/libro de ficcion/i)).toBeInTheDocument();
        expect(screen.queryByText(/libro de poesia/i)).not.toBeInTheDocument();
    });

});