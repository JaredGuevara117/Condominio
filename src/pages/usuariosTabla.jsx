import React, { useState } from "react";
import "./usuariosAn.css";

const usuariosData = [
  { nombre: "Jane Cooper", rol: "Dueño", telefono: "(225) 555-0118", email: "jane@microsoft.com", torre: "1", estado: "Activo" },
  { nombre: "Floyd Miles", rol: "Dueño", telefono: "(205) 555-0100", email: "floyd@yahoo.com", torre: "4", estado: "Inactivo" },
  { nombre: "Ronald Richards", rol: "Dueño", telefono: "(302) 555-0107", email: "ronald@adobe.com", torre: "10", estado: "Inactivo" },
  { nombre: "Marvin McKinney", rol: "Dueño", telefono: "(252) 555-0126", email: "marvin@tesla.com", torre: "7", estado: "Activo" }
];

const UsuariosTabla = () => {
  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = usuariosData.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.rol.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="usuarios-tabla">
      <h2>Todos los Usuarios</h2>
      
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Torre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nombre}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.email}</td>
              <td>{usuario.torre}</td>
              <td className={usuario.estado === "Activo" ? "activo" : "inactivo"}>{usuario.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosTabla;
