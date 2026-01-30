import { useState } from "react";

export default function EmpleadoDetails({ empleado, onGuardar, onCancelar }) {
    return (
        <div>
            <h1>Detalles del Empleado</h1>
            <form>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={empleado.nombre} onChange={(e) => onGuardar({ ...empleado, nombre: e.target.value })} />
                <label htmlFor="apellido">Apellido</label>
                <input type="text" id="apellido" name="apellido" value={empleado.apellido} onChange={(e) => onGuardar({ ...empleado, apellido: e.target.value })} />
                <button type="button" onClick={onCancelar}>Cancelar</button>
                <button type="button" onClick={() => onGuardar(empleado)}>Guardar</button>
            </form>
        </div>
    );
}