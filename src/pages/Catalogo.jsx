import { useMemo, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { LIBROS, CATEGORIAS } from '../data/libros.mock';
import Filters from '../components/libros/Filters';
import LibroGrid from '../components/libros/LibroGrid';

export default function Catalogo() {
    // traemos las funciones del context
    const { addToCart, resetCart, cartCount } = useCart();
    // estado para el filtro
    const [filter, setFilter] = useState('all');

    // memo para filtrar la lista de libros
    // se actualiza solo si 'filter' cambia
    const list = useMemo(() => {
        return filter === 'all'
        ? LIBROS
        : LIBROS.filter(p => p.categoria === filter);
    }, [filter]);

    return (
        <main>
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h2>Catálogo de Libros</h2>
                {/* boton para vaciar carrito */}
                {cartCount > 0 && (
                    <Button variant="outline-danger" size="sm" onClick={resetCart}>
                        Vaciar Carrito ({cartCount})
                    </Button>
                )}
            </div>
            <p className="text-muted mb-3">autores independientes y emergentes</p>

            {/* componente de filtros */}
            <Filters
                current={filter}
                onChange={setFilter}
                options={CATEGORIAS}
                total={LIBROS.length}
            />

            {/* la grilla de libros */}
            <LibroGrid items={list} onAdd={addToCart} />
        </Container>
        </main>
    );
}