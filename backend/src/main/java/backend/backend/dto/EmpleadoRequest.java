package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Request = la información que el cliente envía al servidor
@Data
@NoArgsConstructor
@AllArgsConstructor

public class EmpleadoRequest {
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String puesto;
    private Double salario;
    private Long idDepartamento; // ID del departamento al que pertenece el empleado    
}
