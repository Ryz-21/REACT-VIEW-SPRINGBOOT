import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/loginimage/googleico.png";
import githubIcon from "../assets/loginimage/githubico.png";
import facebookIcon from "../assets/loginimage/facebookico.png";
import { useAuth } from "../context/useAuth";
import * as authService from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isLogin) {
        if (!email || !password) {
          setErrorMsg("Por favor completa todos los campos");
          return;
        }

        const result = await authService.login(email, password);
        console.log("Login exitoso", result);

        // Asumiendo que result trae { token, usuario, ... }
        if (result.token) {
          authLogin(result.token, result.usuario || { email });
          navigate("/home"); // O dashboard
        } else {
          setErrorMsg("No se recibió token del servidor");
        }

      } else {
        // REGISTRO
        if (!username || !email || !password || !confirmPassword) {
          setErrorMsg("Por favor completa todos los campos");
          return;
        }
        if (password !== confirmPassword) {
          setErrorMsg("Las contraseñas no coinciden");
          return;
        }
        if (password.length < 6) {
          setErrorMsg("La contraseña debe tener al menos 6 caracteres");
          return;
        }

        await authService.register(username, email, password);
        setSuccessMsg("¡Registro exitoso! Ahora inicia sesión");

        setTimeout(() => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setUsername("");
          setIsLogin(true);
          setSuccessMsg("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      setErrorMsg(error.message || "Ocurrió un error. Inténtalo de nuevo.");
    }
  };

  const toggleForm = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 font-sans p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
            {isLogin ? "Login" : "Registro"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">

          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                Nombre de Usuario
              </label>
              <input
                id="username"
                type="text"
                placeholder="Tu nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 text-gray-800"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 text-gray-800"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 text-gray-800"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 text-gray-800"
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform active:scale-95 transition-all duration-200 mt-2"
          >
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </button>

          {/* Mensaje de error */}
          {errorMsg && (
            <p className="mt-3 text-red-600 bg-red-100 border border-red-200 text-sm p-2 rounded-lg text-center animate-pulse">
              {errorMsg}
            </p>
          )}

          {/* Mensaje de éxito */}
          {successMsg && (
            <p className="mt-3 text-green-600 bg-green-100 border border-green-200 text-sm p-2 rounded-lg text-center animate-bounce">
              {successMsg}
            </p>
          )}

          {isLogin && (
            <>
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-400 text-sm">o</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:scale-110 hover:bg-gray-50 transition-all duration-200 group"
                  disabled
                >
                  <img src={googleIcon} alt="Google" className="w-6 h-6 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                </button>
                <button
                  type="button"
                  className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:scale-110 hover:bg-gray-50 transition-all duration-200 group"
                  disabled
                >
                  <img src={githubIcon} alt="GitHub" className="w-7 h-7 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                </button>
                <button
                  type="button"
                  className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:scale-110 hover:bg-gray-50 transition-all duration-200 group"
                  disabled
                >
                  <img src={facebookIcon} alt="Facebook" className="w-6 h-6 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                </button>
              </div>
            </>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                ¿No tienes cuenta?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                  className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline transition-colors"
                >
                  Regístrate
                </a>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                  className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline transition-colors"
                >
                  Inicia sesión
                </a>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;