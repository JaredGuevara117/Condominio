import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const telefono = event.target.phone.value;
    const contrasena = event.target.password.value;

    try {
      const response = await fetch("https://api-75yd.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ telefono, contrasena }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
        return;
      }

      const { user } = await response.json();
      console.log("Usuario recibido del backend:", user); // Depuración

      // Guardar el usuario en el almacenamiento local
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir según el rol del usuario
      if (user.rol === "administrador") {
        navigate("/inicioAn");
      } else if (user.rol === "inquilino") {
        navigate("/inicioIn");
      } else {
        setError("Rol no reconocido");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo nuevamente.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/src/assets/candad.png" alt="Logo" className="login-logo" />
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="tel" name="phone" placeholder="Número telefónico" required />
            <span className="input-icon">
              <i className="fas fa-phone"></i>
            </span>
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="Contraseña" required />
            <span className="input-icon">
              <i className="fas fa-lock"></i>
            </span>
          </div>
          <a href="#" className="forgot-password">Olvidé mi contraseña</a>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
