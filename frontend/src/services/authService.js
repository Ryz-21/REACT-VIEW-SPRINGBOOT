// src/services/authService.js
const API_URL = "http://localhost:8080/api/auth"; // corregido

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const resultText = await response.text(); // Siempre obtiene el texto de respuesta

    if (!response.ok) {
      // Si el backend devuelve 401 o 404, lanza error con el texto exacto
      throw new Error(resultText);
    }

    return resultText; // Login exitoso
  } catch (error) {
    // Error general de conexión o backend caído
    if (error.message.includes("Failed to fetch")) {
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
    }
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const resultText = await response.text(); // Siempre obtiene el texto de respuesta

    if (!response.ok) {
      // Si el backend devuelve error, lanza error con el texto exacto
      throw new Error(resultText);
    }

    return resultText; // Registro exitoso
  } catch (error) {
    // Error general de conexión o backend caído
    if (error.message.includes("Failed to fetch")) {
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
    }
    throw error;
  }
};
