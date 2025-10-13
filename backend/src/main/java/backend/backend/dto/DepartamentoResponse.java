package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Response = la información que el servidor envía al cliente
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartamentoResponse {
    private Long idDepartamento;
    private String nombre;
    private String descripcion;
}
