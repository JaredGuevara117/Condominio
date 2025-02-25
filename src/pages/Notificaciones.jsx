import React, { useState, useEffect } from "react";
import "./notificaciones.css"; // Crea este archivo para los estilos que necesites

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const token = localStorage.getItem("token");

  // Aseguramos que el usuario tenga las propiedades necesarias
  const departamento = user?.departamento;
  const torre = user?.torre;

  const fetchNotificaciones = async () => {
    try {
      const response = await fetch(
        `https://api-75yd.onrender.com/notificaciones/${departamento}/${torre}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setNotificaciones(data);
      } else if (data.data) {
        setNotificaciones(data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener las notificaciones:", err);
      setError("Error al obtener las notificaciones");
      setLoading(false);
    }
  };

  // Al montar el componente, "marcamos" las notificaciones como leídas
  useEffect(() => {
    // Por ejemplo, podrías actualizar un valor en el localStorage:
    localStorage.setItem("nuevasNotificaciones", JSON.stringify(false));
    fetchNotificaciones();
  }, [departamento, torre]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4001/notificaciones/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setNotificaciones((prev) => prev.filter((n) => n._id !== id));
      } else {
        console.error("Error al eliminar la notificación");
      }
    } catch (err) {
      console.error("Error al eliminar la notificación:", err);
    }
  };

  if (loading) {
    return <div>Cargando notificaciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="notificaciones-container">
      <h2>Mis Notificaciones</h2>
      {notificaciones.length === 0 ? (
        <p>No tienes notificaciones</p>
      ) : (
        <ul className="notificaciones-list">
          {notificaciones.map((noti) => (
            <li key={noti._id} className="notificacion-item">
              <div>
                <strong>Motivo:</strong> {noti.motivo}
              </div>
              <div>
                <strong>Cantidad:</strong> {noti.cantidad}
              </div>
              <div>
                <strong>Creado:</strong> {new Date(noti.createdAt).toLocaleString()}
              </div>
              <button onClick={() => handleDelete(noti._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notificaciones;
