import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/inicioAn"); // Redirige a la página de InicioAn
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
          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
