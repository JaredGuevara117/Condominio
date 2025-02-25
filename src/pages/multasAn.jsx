import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./multasAn.css";

const MultasAn = () => {
  const [form, setForm] = useState({
    departamento: "",
    torre: "",
    motivo: "",
    cantidad: ""
  });
  const [multas, setMultas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalRef = useRef(null);

  const token = localStorage.getItem("token");
  console.log("Token guardado en localStorage:", token);

  const token = localStorage.getItem("token");
  console.log("Token guardado en localStorage:", token);

  useEffect(() => {
    fetchMultas();
  }, []);

  const fetchMultas = async () => {
    try {
      const response = await fetch("https://api-75yd.onrender.com/multas/getmultas", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
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
    setLoading(true);
    
    const multaData = {
      cantidad: parseFloat(form.cantidad) || 0,
      departamento: form.departamento,
      torre: form.torre,
      motivo: form.motivo
    };

    try {
      const response = await fetch("http://localhost:4001/multas", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
         },
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify(multaData),
      });

      console.log(multaData);

      console.log(multaData);

      const result = await response.json();
      if (response.ok) {
        setModalMessage("Multa registrada con éxito.");
        fetchMultas();
      } else {
        setModalMessage("Error: " + result.message);
      }
    } catch (error) {
      setModalMessage("Error al registrar la multa.");
    } finally {
      setLoading(false);
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 3000);
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
          <button type="submit" className="boton" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Multa"}
          </button>
        </form>
      </div>

      <CSSTransition nodeRef={modalRef} in={modalOpen} timeout={300} classNames="modal" unmountOnExit>
        <div className="modal-overlay">
          <div ref={modalRef} className="modal-content">
            {modalMessage}
          </div>
        </div>
      </CSSTransition>

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

      <style>
        {`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-enter {
          opacity: 0;
          transform: scale(0.9);
        }
        .modal-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms, transform 300ms;
        }
        .modal-exit {
          opacity: 1;
        }
        .modal-exit-active {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 300ms, transform 300ms;
        }
        .modal-content {
          background: white;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
        }
        `}
      </style>
    </div>
  );
};

//hola
export default MultasAn;
