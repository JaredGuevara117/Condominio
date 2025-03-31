import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./ChangePasswordModal.css";

function ChangePasswordModal({ isOpen, onClose }) {
  const [correoOtelefono, setCorreoOtelefono] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoutAll, setLogoutAll] = useState(false);
  const [step, setStep] = useState(1); // 1: Solicitar token, 2: Verificar token y cambiar contraseña
  const [error, setError] = useState("");
  const [autoOpen, setAutoOpen] = useState(false); // Estado para abrir automáticamente el modal

  const navigate = useNavigate(); // Inicializar useNavigate

  // Verificar si hay un token en la URL al cargar el componente
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      setToken(urlToken);
      setStep(2); // Cambiar al paso de ingresar nueva contraseña
      setAutoOpen(true); // Abrir automáticamente el modal
    }
  }, []);

  const handleRequestToken = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4001/recuperacion/solicitar-cambio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correoOtelefono }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al solicitar el token.");
      }

      alert("Se ha enviado un correo con el enlace para cambiar la contraseña.");
      setStep(2); // Pasar al siguiente paso
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/recuperacion/cambiar-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nuevaContrasena: newPassword, logoutAll }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cambiar la contraseña.");
      }

      alert("Contraseña cambiada exitosamente.");
      navigate("/"); // Redirigir al login
    } catch (err) {
      setError(err.message);
    }
  };

  // Si el modal no está abierto y no se debe abrir automáticamente, no renderizar nada
  if (!isOpen && !autoOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{step === 1 ? "Solicitar Cambio de Contraseña" : "Cambiar Contraseña"}</h2>
        <form onSubmit={step === 1 ? handleRequestToken : handleChangePassword}>
          {step === 1 && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Correo o Teléfono"
                value={correoOtelefono}
                onChange={(e) => setCorreoOtelefono(e.target.value)}
                required
              />
            </div>
          )}
          {step === 2 && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  disabled={!!token} // Deshabilitar si el token ya viene de la URL
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Nueva Contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>
                  <input
                    type="checkbox"
                    checked={logoutAll}
                    onChange={(e) => setLogoutAll(e.target.checked)}
                  />
                  Cerrar sesión en todos los dispositivos
                </label>
              </div>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{step === 1 ? "Solicitar Token" : "Cambiar Contraseña"}</button>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ChangePasswordModal;