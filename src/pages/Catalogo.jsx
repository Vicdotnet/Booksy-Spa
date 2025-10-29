import { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { LIBROS, CATEGORIAS } from '../data/libros.mock'; // datos de libros
import Filters from '../components/libros/Filters'; // componentes de libros
import LibroGrid from '../components/libros/LibroGrid'; // componentes de libros

export default function Catalogo() {
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('all'); // estado para el filtro

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
            <h2 className="mb-2">Catálogo de Libros</h2>
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