import React from "react";
import UsuariosTabla from "./usuariosTabla";
import UsuariosFormulario from "./usuariosFormulario";
import "./usuariosAn.css";

const UsuariosAn = () => {
  return (
    <div className="usuariosAn-container">
      <div className="usuarios-content">
        <UsuariosTabla />
        <UsuariosFormulario />
      </div>
    </div>
  );
};

export default UsuariosAn;
