export default function EmpleadosList({ empleados, onEditar, onEliminar }) {
    return (
        <div>
            <h1>Empleados</h1>
            <ul>
                {empleados.map(empleado => (
                    <li key={empleado.id}>
                        {empleado.nombre} {empleado.apellido}
                        <button onClick={() => onEditar(empleado)}>Editar</button>
                        <button onClick={() => onEliminar(empleado.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}