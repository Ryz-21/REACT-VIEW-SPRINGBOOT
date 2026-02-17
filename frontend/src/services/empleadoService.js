const API_URL = "http://localhost:8080/api/empleados";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getAllEmpleados = async () => {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Error al obtener empleados");
    return await response.json();
};

export const getEmpleadoById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Error al obtener el empleado");
    return await response.json();
};

export const createEmpleado = async (empleado) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(empleado),
    });
    if (!response.ok) throw new Error("Error al crear empleado");
    return await response.json();
};

export const updateEmpleado = async (id, empleado) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(empleado),
    });
    if (!response.ok) throw new Error("Error al actualizar empleado");
    return await response.json();
};

export const deleteEmpleado = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error("Error al eliminar empleado");
    return true;
};
