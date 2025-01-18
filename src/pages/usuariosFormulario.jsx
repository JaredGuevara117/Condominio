import React, { useState } from "react";
import "./usuariosAn.css";

const UsuariosFormulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario registrado:", formData);
  };

  return (
    <div className="usuarios-formulario">
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre de usuario" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="tel" name="telefono" placeholder="Número telefónico" onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default UsuariosFormulario;
