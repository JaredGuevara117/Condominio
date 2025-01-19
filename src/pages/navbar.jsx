import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/condominion.png" alt="Logo" />
        <span className="navbar-logo-text">CORPORATION</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink 
            to="/inicioAn" 
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/usuariosAn" 
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/pagosAn" 
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Pagos
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/multasAn" 
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Multas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/reportesAn" 
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            Reportes
          </NavLink>
        </li>
      </ul>
      <div className="navbar-icons">
        <i className="fas fa-bookmark"></i>
        <i className="fas fa-envelope"></i>
        <img
          src="/src/assets/usuario.png"
          alt="Profile"
          className="navbar-profile"
        />
      </div>
    </nav>
  );
};

export default Navbar;
