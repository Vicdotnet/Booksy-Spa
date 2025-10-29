import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Catalogo from './Catalogo';

//  importamos el provider y el contexto
import { AppProvider, AppContext } from '../context/AppContext';

// mock de los datos de libros
jest.mock('../data/libros.mock', () => ({
    CATEGORIAS: ['Ficcion', 'Poesia'],
    LIBROS: [
        { id: 1, titulo: 'Libro de Ficcion', autor: 'Autor 1', precio: 1000, categoria: 'Ficcion' },
        { id: 2, titulo: 'Libro de Poesia', autor: 'Autor 2', precio: 2000, categoria: 'Poesia' }
    ]
}));




describe('Componente Catalogo', () => {

    test('se monta y muestra el titulo', () => {
        //  hay que envolverlo en el provider
        render(<AppProvider><Catalogo /></AppProvider>);
        expect(screen.getByRole('heading', { name: /catálogo de libros/i })).toBeInTheDocument();
    });

    test('renderiza todas las tarjetas de libros del mock', () => {
        //  hay que envolverlo en el provider
        render(<AppProvider><Catalogo /></AppProvider>);
        expect(screen.getByText(/libro de ficcion/i)).toBeInTheDocument();
        expect(screen.getByText(/libro de poesia/i)).toBeInTheDocument();
    });

    test('filtra los libros al hacer click en una categoria', async () => {
        //  hay que envolverlo en el provider
        render(<AppProvider><Catalogo /></AppProvider>);
        
        expect(screen.getByText(/libro de ficcion/i)).toBeInTheDocument();
        expect(screen.getByText(/libro de poesia/i)).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: /^ficcion$/i }));

        expect(screen.getByText(/libro de ficcion/i)).toBeInTheDocument();
        expect(screen.queryByText(/libro de poesia/i)).not.toBeInTheDocument();
    });


    test('click en Agregar invoca la funcion addToCart del contexto', async () => {
        
        // 1. creamos el mock
        const addToCartMock = jest.fn();
        
        // 2. creamos el valor falso del contexto
        const mockValue = {
            cartCount: 0,
            addToCart: addToCartMock, // aqui pasamos el mock
            userName: 'test',
            login: jest.fn()
        };
        
        // 3. renderizamos usando el .Provider con el valor falso
        render(
            <AppContext.Provider value={mockValue}>
                <Catalogo />
            </AppContext.Provider>
        );

        // 4. click en el boton
        const botonesAgregar = screen.getAllByRole('button', { name: /agregar/i });
        await userEvent.click(botonesAgregar[0]);

        // 5. probamos el mock
        expect(addToCartMock).toHaveBeenCalledTimes(1);
    });

});