import React, { useState } from "react";
import "../styless/Login.css";
import googleIcon from "../assets/loginimage/googleico.png";
import githubIcon from "../assets/loginimage/githubico.png";
import facebookIcon from "../assets/loginimage/facebookico.png";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // solo para errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // limpia mensaje anterior

    try {
      const result = await login(email, password);
      console.log("✅ Login exitoso:", result);

      // Notificación tipo toast simple
      alert("Inicio de sesión exitoso 👋 Bienvenido " + email);

      // Redirigir o limpiar formulario
      // window.location.href = "/dashboard";
      setEmail("");
      setPassword("");
    } catch (error) {
      // Mostrar mensaje de error debajo del formulario
      setErrorMsg(error.message);
      console.error("❌ Error en login:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

          {/* Mensaje solo si hay error */}
          {errorMsg && <p className="login-error">{errorMsg}</p>}

          <div className="divider">o</div>

          <div className="social-login">
            <button type="button" className="social-btn google">
              <img src={googleIcon} alt="Google" />
            </button>
            <button type="button" className="social-btn github">
              <img src={githubIcon} alt="GitHub" />
            </button>
            <button type="button" className="social-btn facebook">
              <img src={facebookIcon} alt="Facebook" />
            </button>
          </div>

          <p className="signup-text">
            ¿No tienes cuenta? <a href="#">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
