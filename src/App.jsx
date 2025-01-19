import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import InicioAn from "./pages/inicioAn";
import Navbar from "./pages/navbar"; // Importa tu componente Navbar
import UsuariosAn from "./pages/usuariosAn";
import PagosAn from "./pages/pagosAn";
import MultasAn from "./pages/multasAn";
import ReportesAn from "./pages/reportesAn";

const App = () => {
  const location = useLocation();

  // Función para determinar si mostrar el Navbar
  const showNavbar = location.pathname !== "/"; // Oculta el Navbar en la ruta del login "/"

  return (
    <>
      {showNavbar && <Navbar />} {/* Renderiza el Navbar solo si no está en la página de Login */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicioAn" element={<InicioAn />} />
        <Route path="/usuariosAn" element={<UsuariosAn />} />
        <Route path="/pagosAn" element={<PagosAn/>} />
        <Route path="/multasAn" element={<MultasAn/>} />
        <Route path="/reportesAn" element={<ReportesAn/>} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </>
  );
};

// Usa el BrowserRouter para envolver la aplicación
const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
