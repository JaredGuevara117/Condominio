import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import InicioAn from "./pages/inicioAn";
import UsuariosAn from "./pages/usuariosAn";
import PagosAn from "./pages/pagosAn";
import MultasAn from "./pages/multasAn";
import ReportesAn from "./pages/reportesAn";
import InicioIn from "./pages/inicioIn";
import Navbar from "./pages/navbar"; // Importa tu componente Navbar
import Notificaciones from "./pages/Notificaciones";

// Componente para proteger las rutas
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Recupera los datos del usuario del localStorage

  if (!user) {
    return <Navigate to="/" replace />; // Si no está logueado, redirige al login
  }

  if (user.rol !== allowedRole) {
    return <Navigate to="/" replace />; // Redirige si el rol no coincide
  }

  return children;
};

const App = () => {
  const location = useLocation();

  // Función para determinar si mostrar el Navbar
  const showNavbar = location.pathname !== "/"; // Oculta el Navbar en la ruta del login "/"

  return (
    <>
      {showNavbar && <Navbar />} {/* Renderiza el Navbar solo si no está en la página de Login */}
      <Routes>
        {/* Ruta pública para el Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas para el administrador */}
        <Route
          path="/inicioAn"
          element={
            <ProtectedRoute allowedRole="administrador">
              <InicioAn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuariosAn"
          element={
            <ProtectedRoute allowedRole="administrador">
              <UsuariosAn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagosAn"
          element={
            <ProtectedRoute allowedRole="administrador">
              <PagosAn />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/Notificaciones"
          element={
            <ProtectedRoute allowedRole="inquilino">
              <Notificaciones />
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/Notificaciones"
          element={
            <ProtectedRoute allowedRole="administrador">
              <Notificaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multasAn"
          element={
            <ProtectedRoute allowedRole="administrador">
              <MultasAn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multasAn"
          element={
            <ProtectedRoute allowedRole="inquilino">
              <MultasAn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportesAn"
          element={
            <ProtectedRoute allowedRole="administrador">
              <ReportesAn />
            </ProtectedRoute>
          }
        />

        {/* Ruta pública para el inquilino */}
        <Route
          path="/inicioIn" element={
            <ProtectedRoute allowedRole="inquilino">
              <InicioIn />
            </ProtectedRoute>
          } 
        />
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
