package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Información que el cliente envía al servidor
public class ReporteRequest {
    private Long idReporte;
    private String titulo;
    private String descripcion;
    private Long idEmpleado;       // ID del empleado asociado
    private Long idUsuario;        // ID del usuario asociado
    private Long idDepartamento;   // ID del departamento asociado
}
