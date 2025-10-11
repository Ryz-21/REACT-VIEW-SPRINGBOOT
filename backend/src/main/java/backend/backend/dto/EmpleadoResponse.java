package backend.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@NoArgsConstructor
@Data
@AllArgsConstructor
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
