import React, { useState, useEffect } from "react";
import "./multasAn.css";

const MultasAn = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    torre: "",
    departamento: "",
    motivo: "",
    cantidad: ""
  });

  const [multas, setMultas] = useState([]); // Estado para almacenar las multas

  useEffect(() => {
    fetchMultas(); // Obtener multas al cargar el componente
  }, []);

  const fetchMultas = async () => {
    try {
      const response = await fetch("http://localhost:4001/multas/getmultas");
      const data = await response.json();
      setMultas(data);
    } catch (error) {
      console.error("Error al obtener multas:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const multaData = {
      cantidad: parseFloat(form.cantidad) || 0,  // Convierte a número y maneja NaN
      departamento: form.departamento,
      torre: form.torre,
      motivo: form.motivo
    };
    

    try {
      const response = await fetch("http://localhost:4001/multas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(multaData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Multa registrada con éxito.");
        fetchMultas(); // Refrescar la lista de multas
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error al registrar la multa y notificación:", error.stack);
      res.status(500).json({ message: "Error al registrar la multa", error: error.message });
    }    
  };

  return (
    <div className="multas-container">
      <div className="registrar-multa">
        <h3>Registrar multa</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="departamento">Departamento</label>
            <input type="text" id="departamento" placeholder="Ej. A3" value={form.departamento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="torre">Torre</label>
            <input type="text" id="torre" placeholder="#Torre" value={form.torre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="motivo">Motivo</label>
            <input type="text" id="motivo" placeholder="Ej. Vidrio roto" value={form.motivo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cantidad">Monto ($)</label>
            <input type="number" id="cantidad" placeholder="Ej. 100" value={form.cantidad} onChange={handleChange} required />
          </div>
          <button type="submit" className="boton">Registrar Multa</button>
        </form>
      </div>

      {/* Tabla de Gestión de Multas */}
      <div className="gestionar-multas">
        <h3>Gestionar multas</h3>
        <table>
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Torre</th>
              <th>Motivo</th>
              <th>A pagar</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {multas.length > 0 ? (
              multas.map((multa) => (
                <tr key={multa._id}>
                  <td>{multa.departamento}</td>
                  <td>{multa.torre}</td>
                  <td>{multa.motivo}</td>
                  <td>${multa.cantidad}</td>
                  <td>{new Date(multa.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay multas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultasAn;
