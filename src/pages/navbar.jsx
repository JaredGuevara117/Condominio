import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./navbar.css";

const socket = io("https://api-75yd.onrender.com");

const NavbarAdmin = ({ setNuevasNotificaciones, nuevasNotificaciones, handleLogout }) => (
  <nav className="navbar">
    <div className="navbar-logo">
      <img src="/src/assets/condominion.png" alt="Logo" />
      <span className="navbar-logo-text">CORPORATION</span>
    </div>
    <ul className="navbar-links">
      <li>
        <NavLink to="/inicioAn" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Inicio
        </NavLink>
      </li>
      <li>
        <NavLink to="/usuariosAn" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Usuarios
        </NavLink>
      </li>
      <li>
        <NavLink to="/pagosAn" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Pagos
        </NavLink>
      </li>
      <li>
        <NavLink to="/multasAn" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Multas
        </NavLink>
      </li>
      <li>
        <NavLink to="/reportesAn" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Reportes
        </NavLink>
      </li>
    </ul>
    <div className="navbar-icons">
      <NavLink
        to="/Notificaciones"
        className="notification-icon"
        onClick={() => setNuevasNotificaciones(false)}
      >
        <i className={`fas fa-envelope ${nuevasNotificaciones ? "notificacion-activa" : ""}`}></i>
      </NavLink>
      <img src="/src/assets/usuario.png" alt="Profile" className="navbar-profile" />
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  </nav>
);

const NavbarInquilino = ({ setNuevasNotificaciones, nuevasNotificaciones, handleLogout }) => (
  <nav className="navbar">
    <div className="navbar-logo">
      <img src="/src/assets/condominion.png" alt="Logo" />
      <span className="navbar-logo-text">CORPORATION</span>
    </div>
    <ul className="navbar-links">
      <li>
        <NavLink to="/inicioIn" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Inicio
        </NavLink>
      </li>
      <li>
        <NavLink to="/multasAn" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Multas
        </NavLink>
      </li>
      <li>
        <NavLink to="/Notificaciones" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Notificaciones
        </NavLink>
      </li>
    </ul>
    <div className="navbar-icons">
      <NavLink
        to="/Notificaciones"
        className="notification-icon"
        onClick={() => setNuevasNotificaciones(false)}
      >
        <i className={`fas fa-envelope ${nuevasNotificaciones ? "notificacion-activa" : ""}`}></i>
      </NavLink>
      <img src="/src/assets/usuario.png" alt="Profile" className="navbar-profile" />
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  </nav>
);

const Navbar = () => {
  const [nuevasNotificaciones, setNuevasNotificaciones] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNotificaciones = async () => {
      if (!user || !user.departamento || !user.torre) {
        console.warn("Faltan datos de departamento o torre en el usuario");
        return;
      }
      const { departamento, torre } = user;
      try {
        const response = await fetch(
          `https://api-75yd.onrender.com/notificaciones/${departamento}/${torre}`
        );
        const data = await response.json();
        if ((Array.isArray(data) && data.length > 0) || (data.data && data.data.length > 0)) {
          setNuevasNotificaciones(true);
        }
      } catch (err) {
        console.error("Error al obtener notificaciones:", err);
      }
    };

    fetchNotificaciones();

    socket.on("nuevaNotificacion", () => {
      setNuevasNotificaciones(true);
    });
    return () => {
      socket.off("nuevaNotificacion");
    };
  }, [user]);

  // Detecta si la ruta actual es '/Notificaciones' para marcar como leídas
  useEffect(() => {
    if (location.pathname === "/Notificaciones") {
      setNuevasNotificaciones(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Elimina los datos del usuario
    navigate("/"); // Redirige a la página de inicio de sesión
  };

  if (!user) return null; // No mostrar Navbar si no hay usuario

  return user.rol === "administrador" ? (
    <NavbarAdmin
      setNuevasNotificaciones={setNuevasNotificaciones}
      nuevasNotificaciones={nuevasNotificaciones}
      handleLogout={handleLogout}
    />
  ) : (
    <NavbarInquilino
      setNuevasNotificaciones={setNuevasNotificaciones}
      nuevasNotificaciones={nuevasNotificaciones}
      handleLogout={handleLogout}
    />
  );
};

export default Navbar;
