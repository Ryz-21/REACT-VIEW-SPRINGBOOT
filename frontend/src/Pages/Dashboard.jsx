// src/Pages/Dashboard.jsx
import { useAuth } from "../context/useAuth";
import DashboardItem from "../components/ui/DashboardItem";
import { FaUsers } from "react-icons/fa";

export default function Dashboard() {
    const { user } = useAuth();

    // Mock data for now to prevent crash
    const empleados = [];
    const departamentos = [];
    const Reportes = [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardItem
                    icon={<FaUsers className="w-6 h-6" />}
                    title="Empleados"
                    value={empleados.length}
                    description="Total de empleados registrados"
                    color="bg-blue-500"
                />
                <DashboardItem
                    icon={<FaUsers className="w-6 h-6" />}
                    title="Departamentos"
                    value={departamentos.length}
                    description="Total de departamentos activos"
                    color="bg-green-500"
                />
                <DashboardItem
                    icon={<FaUsers className="w-6 h-6" />}
                    title="Reportes"
                    value={Reportes.length}
                    description="Total de Reportes generados"
                    color="bg-red-500"
                />
            </div>
        </div>
    );
}

