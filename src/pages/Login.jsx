import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
 // Importar jwt-decode
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import candadoImg from "../assets/candad.png"; // Importación correcta

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Limpiar errores previos
  
    const telefono = event.target.phone.value;
    const contrasena = event.target.password.value;
  
    try {
      const response = await fetch("https://api-75yd.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono, contrasena }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al iniciar sesión.");
      }
  
      const { user, token } = await response.json();
  
      
      // 🔹 Decodificar el token de forma segura
      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
      } catch (decodeError) {
        throw new Error("Token inválido.");
      }
  
      // Guardar token y usuario en localStorage
      localStorage.setItem("token", token);
      console.log("Token guardado en localStorage:", token);
      console.log("Token guardado en localStorage:", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // Redirigir según el rol del usuario
      switch (decodedToken.rol) {
        case "administrador":
          navigate("/inicioAn");
          break;
        case "inquilino":
          navigate("/inicioIn");
          break;
        default:
          throw new Error("Rol no reconocido");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error en el login:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={candadoImg} alt="Logo" className="login-logo" />
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
