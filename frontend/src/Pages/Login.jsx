import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styless/Login.css";
import googleIcon from "../assets/loginimage/googleico.png";
import githubIcon from "../assets/loginimage/githubico.png";
import facebookIcon from "../assets/loginimage/facebookico.png";
import { useAuth } from "../context/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (isLogin) {
      // Modo prueba: cualquier email/contraseña funciona
      if (email && password) {
        console.log(" Login exitoso");
        authLogin("DEMO_TOKEN_DEV");
        navigate("/home");
      } else {
        setErrorMsg("Por favor completa todos los campos");
      }
    } else {
      // Registro
      if (password !== confirmPassword) {
        setErrorMsg("Las contraseñas no coinciden");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (email) {
        setSuccessMsg(" Registro exitoso! Ahora inicia sesión");
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsLogin(true);
          setSuccessMsg("");
        }, 1500);
      }
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
                <button type="button" className="social-btn google" disabled>
                  <img src={googleIcon} alt="Google" />
                </button>
                <button type="button" className="social-btn github" disabled>
                  <img src={githubIcon} alt="GitHub" />
                </button>
                <button type="button" className="social-btn facebook" disabled>
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