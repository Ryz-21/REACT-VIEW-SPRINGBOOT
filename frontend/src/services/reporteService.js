const API_URL = "http://localhost:8080/api/reportes";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getAllReportes = async () => {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Error al obtener reportes");
    return await response.json();
};

export const getReporteById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Error al obtener el reporte");
    return await response.json();
};

export const createReporte = async (reporte) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(reporte),
    });
    if (!response.ok) throw new Error("Error al crear reporte");
    return await response.json();
};

export const updateReporte = async (id, reporte) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(reporte),
    });
    if (!response.ok) throw new Error("Error al actualizar reporte");
    return await response.json();
};

export const deleteReporte = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Error al eliminar reporte");
    return true;
};
