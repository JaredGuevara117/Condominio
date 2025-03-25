import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Importar jwt-decode correctamente
import ChangePasswordModal from "../components/ChangePasswordModal"; // Importar el modal
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import candadoImg from "../assets/candad.png"; // Importación correcta

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Estado para el checkbox
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    verificarSesion(); // Verificar si hay una sesión guardada
  }, []);

  // 🔹 Función para verificar si hay sesión activa desde la BD
  const verificarSesion = async () => {
    const telefono = localStorage.getItem("telefono");
    const token = localStorage.getItem("token");

    if (!telefono || !token) {
      console.log("📢 No hay sesión guardada en localStorage.");
      return;
    }

    try {
      const response = await fetch("https://api-75yd.onrender.com/autologin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("❌ Sesión inválida:", data.error);
        localStorage.clear(); // Borrar datos inválidos
        return;
      }

      console.log("✅ Sesión válida, redirigiendo...");
      manejarRedireccion(data.user, data.token);
    } catch (err) {
      console.error("🔥 Error al verificar sesión:", err);
    }
  };

  // 🔹 Función para manejar inicio de sesión
  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const telefono = event.target.phone.value;
    const contrasena = event.target.password.value;

    try {
      const response = await fetch("https://api-75yd.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono, contrasena, rememberMe }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al iniciar sesión.");
      }

      const { user, token } = await response.json();

      console.log("Token recibido:", token); // Log para verificar el token recibido

      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
        console.log("Token decodificado:", decodedToken); // Log para verificar el token decodificado
      } catch (decodeError) {
        throw new Error("Token inválido.");
      }

      // Guardar el token en localStorage y en BD si "Recordar sesión" está activado
      localStorage.setItem("telefono", telefono);
      console.log("📢 Teléfono guardado en localStorage:", telefono);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rol", user.rol);
      localStorage.setItem("rememberMe", rememberMe);
      localStorage.setItem("id", user._id);
      console.log(localStorage.getItem("id"));
      if (rememberMe) {
        await fetch("https://api-75yd.onrender.com/login/guardarToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telefono, token }),
        });
      }

      manejarRedireccion(user, token);
    } catch (err) {
      setError(err.message);
      console.error("Error en el login:", err);
    }
  };

  // 🔹 Función para redirigir según el rol
  const manejarRedireccion = (user, token) => {
    switch (user.rol) {
      case "administrador":
        navigate("/inicioAn");
        break;
      case "inquilino":
        navigate("/inicioIn");
        break;
      default:
        setError("Rol no reconocido");
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
          <div className="input-group remember-me">
            <label className="remember-me-label">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              Recordar sesión
            </label>
            <a href="#" className="forgot-password" onClick={() => setIsModalOpen(true)}>Olvidé mi contraseña</a>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">ENTRAR</button>
        </form>
      </div>
      <ChangePasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Login;
