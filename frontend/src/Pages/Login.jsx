import React, { useState } from "react";
import "../styless/Login.css";
import googleIcon from "../assets/loginimage/googleico.png";
import githubIcon from "../assets/loginimage/githubico.png";
import facebookIcon from "../assets/loginimage/facebookico.png";
import { login } from "../services/authService"; // Importa el servicio

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password); // Llama al backend
      setMessage(result); // Muestra el mensaje devuelto por el backend
      console.log("✅ Login exitoso:", result);
      // Si deseas redirigir al Dashboard:
      // window.location.href = "/dashboard";
    } catch (error) {
      setMessage(error.message);
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>

          {/* Mensaje dinámico */}
          {message && <p className="login-message">{message}</p>}

          <div className="divider">or</div>

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
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
