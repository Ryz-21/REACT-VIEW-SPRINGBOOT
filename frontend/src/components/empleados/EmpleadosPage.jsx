import { useState, useEffect } from "react";
import EmpleadoDetails from "./EmpleadoDetails";
import EmpleadosList from "./EmpleadosList";
import * as empleadoService from "../../services/empleadoService";
import * as departamentoService from "../../services/departamentoService";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function EmpleadosPage() {
    const [empleados, setEmpleados] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [modo, setModo] = useState("lista"); // 'lista', 'crear', 'editar'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            const [empleadosData, departamentosData] = await Promise.all([
                empleadoService.getAllEmpleados(),
                departamentoService.getAllDepartamentos()
            ]);
            setEmpleados(empleadosData);
            setDepartamentos(departamentosData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGuardar = async (empleado) => {
        try {
            if (empleado.idEmpleado) {
                await empleadoService.updateEmpleado(empleado.idEmpleado, empleado);
            } else {
                await empleadoService.createEmpleado(empleado);
            }
            cargarDatos(); // Recargar lista
            setModo("lista");
            setEmpleadoSeleccionado(null);
        } catch (err) {
            alert("Error al guardar: " + err.message);
        }
    };

    const handleEditar = (empleado) => {
        setEmpleadoSeleccionado(empleado);
        setModo("editar");
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
            try {
                await empleadoService.deleteEmpleado(id);
                setEmpleados(empleados.filter(e => e.idEmpleado !== id));
            } catch (err) {
                alert("Error al eliminar: " + err.message);
            }
        }
    };

    const handleCancelar = () => {
        setModo("lista");
        setEmpleadoSeleccionado(null);
    };

    const filteredEmpleados = empleados.filter(e =>
        e.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.dni.includes(searchTerm)
    );

    if (loading && modo === "lista") return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestionar Empleados</h1>
                {modo === "lista" && (
                    <button
                        onClick={() => { setEmpleadoSeleccionado(null); setModo("crear"); }}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        <FaPlus /> Nuevo Empleado
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {modo === "lista" ? (
                <>
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
                            <FaSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, apellido o DNI..."
                                className="outline-none w-full text-gray-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <EmpleadosList
                        empleados={filteredEmpleados}
                        onEditar={handleEditar}
                        onEliminar={handleEliminar}
                    />
                </>
            ) : (
                <EmpleadoDetails
                    empleado={empleadoSeleccionado}
                    departamentos={departamentos}
                    onGuardar={handleGuardar}
                    onCancelar={handleCancelar}
                />
            )}
        </div>
    );
}
