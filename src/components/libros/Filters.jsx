import { ButtonGroup, Button, Badge } from 'react-bootstrap';

// los botones para filtrar por categoria
export default function Filters({ current, onChange, options, total }) {
    const allActive = current === 'all'; // para saber si "todos" esta activo
    return (
        <div className="d-flex align-items-center justify-content-between mb-3">
        <ButtonGroup>
            {/* boton de todos */}
            <Button
                variant={allActive ? 'primary' : 'outline-primary'}
                onClick={() => onChange('all')}
            >
                Todos <Badge bg={allActive ? 'light' : 'primary'} className="ms-1">{total}</Badge>
            </Button>
            
            {/* mapeamos el resto de categorias */}
            {options.map(opt => {
                const isActive = current === opt;
                return (
                    <Button
                        key={opt}
                        variant={isActive ? 'primary' : 'outline-primary'}
                        onClick={() => onChange(opt)}
                    >
                    {opt}
                    </Button>
                );
            })}
        </ButtonGroup>
        </div>
    );
}