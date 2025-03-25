import React, { useState } from "react";
import "./ChangePasswordModal.css";

function ChangePasswordModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoutAll, setLogoutAll] = useState(false); // Estado para el checkbox
  const [error, setError] = useState("");
  const id = localStorage.getItem("id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("https://api-75yd.onrender.com/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({phone, newPassword, logoutAll }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cambiar la contraseña.");
      }

      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="tel"
              placeholder="Número telefónico (+52)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Cambiar Contraseña</button>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ChangePasswordModal;