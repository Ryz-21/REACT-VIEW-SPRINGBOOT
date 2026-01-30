import { useState } from "react";
import EmpleadoDetails from "./EmpleadoDetails";
import EmpleadosList from "./EmpleadosList";

export default function EmpleadosPage() {
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [modo, setModo] = useState("lista");

    const handleGuardar = (empleado) => {
        if (empleado.id) {
            setEmpleados(empleados.map(e => e.id === empleado.id ? empleado : e));
        } else {
            setEmpleados([...empleados, { ...empleado, id: Date.now() }]);
        }
        setModo("lista");
    };

    const handleEditar = (empleado) => {
        setEmpleadoSeleccionado(empleado);
        setModo("editar");
    };

    const handleEliminar = (id) => {
        setEmpleados(empleados.filter(e => e.id !== id));
    };

    const handleCancelar = () => {
        setModo("lista");
        setEmpleadoSeleccionado(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestionar Empleados</h1>
            {modo === "lista" ? (
                <EmpleadosList
                    empleados={empleados}
                    onEditar={handleEditar}
                    onEliminar={handleEliminar}
                />
            ) : (
                <EmpleadoDetails
                    empleado={empleadoSeleccionado}
                    onGuardar={handleGuardar}
                    onCancelar={handleCancelar}
                />
            )}
        </div>
    );
}
