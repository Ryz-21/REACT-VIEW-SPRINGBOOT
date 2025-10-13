package backend.backend.dto;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
//informacion que se envia al cliente
public class EmpleadoResponse {

    private Long idEmpleado;
    private String nombres;
    private String apellidos;
    private String dni;
    private String telefono;
    private String email;
    private String direccion;
    private LocalDate fechaIngreso;
    private LocalDate fechaSalida;
    private Long idDepartamento;
}
