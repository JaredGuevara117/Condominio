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
        <h4>Nombre de usuario</h4>
        <input type="text" name="nombre" placeholder="Nombre de usuario" onChange={handleChange} required />
        <h4>Correo de usuario</h4>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <h4>Número telefónico</h4>
        <input type="tel" name="telefono" placeholder="Número telefónico" onChange={handleChange} required />
        <h4>Contraseña</h4>
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />
        <h4>Departamento</h4>
        <input type="text" name="departamento" placeholder="Letra de departamento" onChange={handleChange} required />
        <h4>Torre</h4>
        <input type="text" name="torre" placeholder="Número de torre" onChange={handleChange} required />
        <h4>Rol</h4>
        <input type="text" name="rol" placeholder="Rol de usuario" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default UsuariosFormulario;
