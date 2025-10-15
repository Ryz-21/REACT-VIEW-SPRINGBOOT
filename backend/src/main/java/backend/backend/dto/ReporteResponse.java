package backend.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Información que se envía al cliente
public class ReporteResponse {
    private Long idReporte;
    private String titulo;
    private String descripcion;
    private LocalDateTime fechaCreacion;
    private String nombreEmpleado;
    private String nombreUsuario;
    private String nombreDepartamento;
}
