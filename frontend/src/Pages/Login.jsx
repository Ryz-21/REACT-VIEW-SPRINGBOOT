import React, { useState } from "react";
import "../styless/Login.css";
import googleIcon from "../assets/loginimage/googleico.png";
import githubIcon from "../assets/loginimage/githubico.png";
import facebookIcon from "../assets/loginimage/facebookico.png";
import { login, register } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // solo para errores
  const [successMsg, setSuccessMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // limpia mensaje anterior
    setSuccessMsg("");

    try {
      if (isLogin) {
        // Lógica de Login
        const result = await login(email, password);
        console.log("✅ Login exitoso:", result);
        setSuccessMsg("Inicio de sesión exitoso 👋 Bienvenido " + email);
        setEmail("");
        setPassword("");
      } else {
        // Lógica de Registro
        if (password !== confirmPassword) {
          setErrorMsg("Las contraseñas no coinciden");
          return;
        }
        if (password.length < 6) {
          setErrorMsg("La contraseña debe tener al menos 6 caracteres");
          return;
        }
        const result = await register(email, password);
        console.log("✅ Registro exitoso:", result);
        setSuccessMsg("¡Registro exitoso! Por favor inicia sesión");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => setIsLogin(true), 2000); // Cambiar a login después de 2 segundos
      }
    } catch (error) {
      setErrorMsg(error.message);
      console.error("❌ Error:", error.message);
    }
  };

  const toggleForm = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>{isLogin ? "Login" : "Registro"}</h2>
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

          {!isLogin && (
            <>
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}

          {isLogin && (
            <div className="login-options">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <button type="submit" className="login-btn">
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </button>

          {/* Mensaje de error */}
          {errorMsg && <p className="login-error">{errorMsg}</p>}
          
          {/* Mensaje de éxito */}
          {successMsg && <p className="login-success">{successMsg}</p>}

          {isLogin && (
            <>
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
            </>
          )}

          <p className="signup-text">
            {isLogin ? (
              <>
                ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Regístrate</a>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Inicia sesión</a>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;