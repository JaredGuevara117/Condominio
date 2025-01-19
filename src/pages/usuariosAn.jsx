import React from "react";
import UsuariosTabla from "./usuariosTabla";
import UsuariosFormulario from "./usuariosFormulario";
import "./usuariosAn.css";

const UsuariosAn = () => {
  return (
    <div className="usuariosAn-container">
      {/* Encabezado de métricas */}
      <div className="usuarios-header">
        <div className="metric-card">
          <h3>1,900</h3>
          <p>Usuarios totales</p>
        </div>
        <div className="metric-card">
          <h3>120</h3>
          <p>Dueños</p>
        </div>
        <div className="metric-card">
          <h3>189</h3>
          <p>Activos</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="usuarios-content">
        <UsuariosTabla />
        <UsuariosFormulario />
      </div>
    </div>
  );
};

export default UsuariosAn;
