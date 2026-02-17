// src/Pages/Dashboard.jsx
import { useEffect, useState } from "react";
import DashboardItem from "../components/ui/DashboardItem";
import { FaUsers, FaBuilding, FaFileAlt } from "react-icons/fa";
import * as departamentoService from "../services/departamentoService";
import * as empleadoService from "../services/empleadoService";
import * as reporteService from "../services/reporteService";

export default function Dashboard() {
    const [counts, setCounts] = useState({ empleados: 0, departamentos: 0, reportes: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            try {
                const [deps, emps, reps] = await Promise.all([
                    departamentoService.getAllDepartamentos(),
                    empleadoService.getAllEmpleados(),
                    reporteService.getAllReportes()
                ]);
                setCounts({
                    departamentos: deps.length,
                    empleados: emps.length,
                    reportes: reps.length
                });
            } catch (error) {
                console.error("Error loading dashboard data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCounts();
    }, []);

    return (
        <div className="container mx-auto p-4 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard General</h1>

            {loading ? (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardItem
                        icon={FaUsers}
                        title="Empleados"
                        value={counts.empleados}
                        description="Total de empleados registrados"
                        color="bg-blue-500"
                        active={true} // Just for style
                    />
                    <DashboardItem
                        icon={FaBuilding}
                        title="Departamentos"
                        value={counts.departamentos}
                        description="Total de departamentos activos"
                        color="bg-green-500"
                        active={true}
                    />
                    <DashboardItem
                        icon={FaFileAlt}
                        title="Reportes"
                        value={counts.reportes}
                        description="Total de Reportes generados"
                        color="bg-red-500"
                        active={true}
                    />
                </div>
            )}
        </div>
    );
}
