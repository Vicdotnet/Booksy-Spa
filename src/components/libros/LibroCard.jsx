import { Card, Button, Badge } from 'react-bootstrap';

// tarjeta para mostrar un solo libro
export default function LibroCard({ libro, onAdd }) {
    // sacamos los datos del libro
    const { titulo, autor, precio, categoria, imageUrl } = libro;

    return (
        <Card className="h-100 shadow-sm">
        {imageUrl && (
            <Card.Img
            variant="top"
            src={imageUrl}
            alt={`portada de ${titulo}`}
            loading="lazy"
            style={{ objectFit: 'cover', height: 180 }}
            />
        )}
        <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
                {titulo}
            </Card.Title>
            {/* la categoria del libro */}
            {categoria && <Badge bg="secondary">{categoria}</Badge>}
            </div>

            {/* mostramos autor y precio */}
            <Card.Text className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                {autor}
            </Card.Text>
            <Card.Text className="text-dark mb-3">
                ${Number(precio).toLocaleString('es-CL')}
            </Card.Text>

            <Button
                variant="primary"
                onClick={onAdd}
                className="mt-auto"
                aria-label={`Agregar ${titulo} al carrito`}
            >
                Agregar
            </Button>
        </Card.Body>
        </Card>
    );
}