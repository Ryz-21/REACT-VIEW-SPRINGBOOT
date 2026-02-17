import { useState, useEffect } from "react";

export default function EmpleadoDetails({ empleado, departamentos, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        dni: "",
        telefono: "",
        email: "",
        direccion: "",
        salario: "",
        fechaIngreso: "", // Should be format YYYY-MM-DD
        fechaSalida: "",
        departamentoId: ""
    });

    useEffect(() => {
        if (empleado) {
            // Map incoming employee data to form
            // Note: date fields might need formatting depending on backend response format
            setFormData({
                ...empleado,
                fechaIngreso: empleado.fechaIngreso ? empleado.fechaIngreso.split('T')[0] : "",
                fechaSalida: empleado.fechaSalida ? empleado.fechaSalida.split('T')[0] : "",
                departamentoId: empleado.departamentoId || ""
            });
        }
    }, [empleado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct the payload expected by the parent/service
        const payload = {
            ...formData,
            // Backend expects nested departamento object
            departamento: { idDepartamento: parseInt(formData.departamentoId) }
        };

        // Remove flattened depId for the payload if not needed, but keep the rest
        // Actually, the parent handles the service call, so we pass the object.
        // We'll pass the 'formData' enriched with the 'departamento' object.
        onGuardar(payload);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {empleado?.idEmpleado ? "Editar Empleado" : "Nuevo Empleado"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Nombres */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                    <input
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Apellidos */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* DNI - Readonly if editing */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                    <input
                        type="text"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                        disabled={!!empleado?.idEmpleado} // Cannot edit DNI
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${empleado?.idEmpleado ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Dirección */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Salario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salario</label>
                    <input
                        type="number"
                        name="salario"
                        value={formData.salario}
                        onChange={handleChange}
                        step="0.01"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Departamento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                    <select
                        name="departamentoId"
                        value={formData.departamentoId}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    >
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map(dep => (
                            <option key={dep.idDepartamento} value={dep.idDepartamento}>
                                {dep.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha Ingreso */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Ingreso</label>
                    <input
                        type="date"
                        name="fechaIngreso"
                        value={formData.fechaIngreso}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Fecha Salida (Optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Salida</label>
                    <input
                        type="date"
                        name="fechaSalida"
                        value={formData.fechaSalida}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onCancelar}
                        className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium"
                    >
                        {empleado?.idEmpleado ? "Actualizar Empleado" : "Guardar Empleado"}
                    </button>
                </div>
            </form>
        </div>
    );
}