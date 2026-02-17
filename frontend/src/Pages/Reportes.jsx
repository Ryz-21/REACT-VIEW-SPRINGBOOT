import { useState, useEffect } from "react";
import * as reporteService from "../services/reporteService";
import * as departamentoService from "../services/departamentoService";
import * as empleadoService from "../services/empleadoService";
import { FaPlus, FaFileAlt, FaCalendarAlt, FaUser, FaBuilding } from "react-icons/fa";

export default function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReporte, setNewReporte] = useState({
        titulo: "",
        descripcion: "",
        fechaCreacion: new Date().toISOString().split('T')[0],
        departamentoId: "",
        empleadoId: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [reportesData, deptData, empData] = await Promise.all([
                reporteService.getAllReportes(),
                departamentoService.getAllDepartamentos(),
                empleadoService.getAllEmpleados()
            ]);
            setReportes(reportesData);
            setDepartamentos(deptData);
            setEmpleados(empData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                titulo: newReporte.titulo,
                descripcion: newReporte.descripcion,
                fechaCreacion: newReporte.fechaCreacion,
                departamento: newReporte.departamentoId ? { idDepartamento: newReporte.departamentoId } : null,
                empleado: newReporte.empleadoId ? { idEmpleado: newReporte.empleadoId } : null,
                // Usuario logic could be added here if needed, passing current user
            };

            await reporteService.createReporte(payload);
            setIsModalOpen(false);
            setNewReporte({
                titulo: "",
                descripcion: "",
                fechaCreacion: new Date().toISOString().split('T')[0],
                departamentoId: "",
                empleadoId: ""
            });
            fetchData();
        } catch (error) {
            alert("Error al crear reporte: " + error.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Reportes</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                    <FaPlus /> Generar Reporte
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reportes.map((reporte) => (
                        <div key={reporte.idReporte} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                            <div className="p-5 flex-grow">
                                <div className="flex items-center gap-2 text-indigo-600 mb-3">
                                    <FaFileAlt />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Reporte #{reporte.idReporte}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{reporte.titulo}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{reporte.descripcion}</p>

                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-gray-400" />
                                        <span>{reporte.fechaCreacion ? new Date(reporte.fechaCreacion).toLocaleDateString() : 'Sin fecha'}</span>
                                    </div>
                                    {reporte.departamentoNombre && (
                                        <div className="flex items-center gap-2">
                                            <FaBuilding className="text-gray-400" />
                                            <span>{reporte.departamentoNombre}</span>
                                        </div>
                                    )}
                                    {reporte.empleadoNombre && ( // Assuming backend response maps this
                                        <div className="flex items-center gap-2">
                                            <FaUser className="text-gray-400" />
                                            <span>{reporte.empleadoNombre}</span>
                                        </div>
                                    )}
                                    {/* Fallback if names are not directly in root (custom DTO response from backend had specific fields, assumed mapped in service or here) */}
                                    {/* Note: The controller returns fields like 'empleado' (string name), 'departamento' (string name) in ReporteResponse */}
                                    {(reporte.empleado && typeof reporte.empleado === 'string') && (
                                        <div className="flex items-center gap-2">
                                            <FaUser className="text-gray-400" />
                                            <span>{reporte.empleado}</span>
                                        </div>
                                    )}
                                    {(reporte.departamento && typeof reporte.departamento === 'string') && (
                                        <div className="flex items-center gap-2">
                                            <FaBuilding className="text-gray-400" />
                                            <span>{reporte.departamento}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {reportes.length === 0 && (
                        <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No hay reportes disponibles.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuevo Reporte</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    required
                                    value={newReporte.titulo}
                                    onChange={(e) => setNewReporte({ ...newReporte, titulo: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={newReporte.descripcion}
                                    onChange={(e) => setNewReporte({ ...newReporte, descripcion: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                    <input
                                        type="date"
                                        required
                                        value={newReporte.fechaCreacion}
                                        onChange={(e) => setNewReporte({ ...newReporte, fechaCreacion: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                                    <select
                                        value={newReporte.departamentoId}
                                        onChange={(e) => setNewReporte({ ...newReporte, departamentoId: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                    >
                                        <option value="">Seleccionar...</option>
                                        {departamentos.map(dep => (
                                            <option key={dep.idDepartamento} value={dep.idDepartamento}>{dep.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Empleado Asociado</label>
                                <select
                                    value={newReporte.empleadoId}
                                    onChange={(e) => setNewReporte({ ...newReporte, empleadoId: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                >
                                    <option value="">Seleccionar...</option>
                                    {empleados.map(emp => (
                                        <option key={emp.idEmpleado} value={emp.idEmpleado}>{emp.nombres} {emp.apellidos}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                                >
                                    Crear Reporte
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}