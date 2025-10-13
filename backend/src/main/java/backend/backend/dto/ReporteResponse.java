package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// informacion que se envia al cliente

public class ReporteResponse {
    private String departamento;
    private Long totalEmpleados;
    private Long empleadosActivos;
    private Long empleadosInactivos;
}
