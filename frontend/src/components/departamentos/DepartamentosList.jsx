import { useState, useEffect } from "react";
import * as departamentoService from "../../services/departamentoService";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function DepartamentosList() {
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDepartamento, setCurrentDepartamento] = useState({ nombre: "", descripcion: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchDepartamentos();
    }, []);

    const fetchDepartamentos = async () => {
        try {
            setLoading(true);
            const data = await departamentoService.getAllDepartamentos();
            setDepartamentos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (departamento = { nombre: "", descripcion: "" }) => {
        setCurrentDepartamento(departamento);
        setIsEditing(!!departamento.idDepartamento);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentDepartamento({ nombre: "", descripcion: "" });
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await departamentoService.updateDepartamento(currentDepartamento.idDepartamento, currentDepartamento);
            } else {
                await departamentoService.createDepartamento(currentDepartamento);
            }
            fetchDepartamentos();
            handleCloseModal();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este departamento?")) {
            try {
                await departamentoService.deleteDepartamento(id);
                fetchDepartamentos();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const filteredDepartamentos = departamentos.filter(d =>
        d.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Departamentos</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                    <FaPlus /> Nuevo Departamento
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar departamentos..."
                        className="outline-none w-full text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-10">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDepartamentos.map((dept) => (
                        <div key={dept.idDepartamento} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{dept.nombre}</h3>
                                <p className="text-gray-600 mb-4">{dept.descripcion}</p>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() => handleOpenModal(dept)}
                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                        title="Editar"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dept.idDepartamento)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        title="Eliminar"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredDepartamentos.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-10">No se encontraron departamentos.</p>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {isEditing ? "Editar Departamento" : "Nuevo Departamento"}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={currentDepartamento.nombre}
                                    onChange={(e) => setCurrentDepartamento({ ...currentDepartamento, nombre: e.target.value })}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    value={currentDepartamento.descripcion}
                                    onChange={(e) => setCurrentDepartamento({ ...currentDepartamento, descripcion: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                                >
                                    {isEditing ? "Guardar Cambios" : "Crear Departamento"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}