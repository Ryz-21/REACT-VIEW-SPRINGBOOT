package backend.backend.dto;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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
    private Double salario;
    private LocalDate fechaIngreso;
    private LocalDate fechaSalida;
    private Long idDepartamento;
}
