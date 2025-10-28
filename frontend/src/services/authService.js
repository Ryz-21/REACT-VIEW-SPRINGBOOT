const API_URL = "hhtp://localhosst:8080/api/auth";


export const login = async (email , password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok){
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return await response.text();
    } catch (error) {
        throw new Error("Login failed: " + error.message);
        throw error;
    }
//throw es un mecanismo para lanzar errores de manera explícita en JavaScript
};