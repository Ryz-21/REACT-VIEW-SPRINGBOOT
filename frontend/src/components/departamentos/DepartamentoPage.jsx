import { useState } from "react";
import DepartamentosList from "./DepartamentosList";
import DepartamentoDetails from "./DepartamentoDetails";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function DepartamentoPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [departamentos, setDepartamentos] = useState([]);

    const handleGuardar = (departamento) => {
        if (departamento.id) {
            setDepartamentos(departamentos.map(d => d.id === departamento.id ? departamento : d));
        } else {
            setDepartamentos([...departamentos, { ...departamento, id: Date.now() }]);
        }
        navigate('/departamentos');
    };

    const handleEditar = (departamento) => {
        navigate('/departamentos/editar', { state: { departamento } });
    };

    const handleEliminar = (id) => {
        setDepartamentos(departamentos.filter(d => d.id !== id));
    };

    const handleCancelar = () => {
        navigate('/departamentos');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestionar Departamentos</h1>
            {departamentos.length === 0 ? (
                <p>No hay departamentos registrados</p>
            ) : (
                <DepartamentosList
                    departamentos={departamentos}
                    onEditar={handleEditar}
                    onEliminar={handleEliminar}
                />
            )}
        </div>
    );
}
