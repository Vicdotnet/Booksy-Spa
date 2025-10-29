import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Catalogo from '../pages/Catalogo'; // cambiado de Products
import Contact from '../pages/Contact';

// definicion de las rutas de la app
function AppRoutes(){
    return (
        <BrowserRouter>
        <NavBar />
        <Routes>
            {/* rutas basicas */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} /> {/* ruta actualizada */}
            <Route path="/contacto" element={<Contact />} />
        </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;