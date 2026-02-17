import { FaEdit, FaTrash } from "react-icons/fa";

export default function EmpleadosList({ empleados, onEditar, onEliminar }) {
    if (!empleados || empleados.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-xl shadow-md">
                <p className="text-gray-500">No hay empleados registrados.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                            <th className="p-4 border-b">Nombre Completo</th>
                            <th className="p-4 border-b">DNI</th>
                            <th className="p-4 border-b">Email</th>
                            <th className="p-4 border-b">Teléfono</th>
                            <th className="p-4 border-b">Departamento</th>
                            <th className="p-4 border-b text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {empleados.map((empleado) => (
                            <tr key={empleado.idEmpleado} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-800 font-medium">
                                    {empleado.nombres} {empleado.apellidos}
                                </td>
                                <td className="p-4 text-gray-600">{empleado.dni}</td>
                                <td className="p-4 text-gray-600">{empleado.email}</td>
                                <td className="p-4 text-gray-600">{empleado.telefono}</td>
                                <td className="p-4 text-gray-600">
                                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-semibold">
                                        ID Dept: {empleado.departamentoId}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEditar(empleado)}
                                            className="text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-full transition-colors"
                                            title="Editar"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEliminar(empleado.idEmpleado)}
                                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            title="Eliminar"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}