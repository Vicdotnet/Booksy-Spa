import { Row, Col } from 'react-bootstrap';
import LibroCard from './LibroCard'; // usamos la tarjeta de libro

// la grilla que muestra todas las tarjetas
export default function LibroGrid({ items, onAdd }) {
    return (
        <Row xs={1} sm={2} lg={3} className="g-3">
        {items.map(p => (
            <Col key={p.id}>
                <LibroCard libro={p} onAdd={() => onAdd(p)} />
            </Col>
        ))}
        </Row>
    );
}