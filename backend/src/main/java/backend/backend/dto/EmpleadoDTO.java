package backend.backend.dto;

import  lombok.AllArgsConstructor;
import  lombok.Builder;
import  lombok.Data;
import  lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// DTO (Data Transfer Object) para la entidad Empleado.
// Se utiliza para enviar/recibir datos sin exponer información sensible.

public class EmpleadoDTO {
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String puesto;
    private Double salario;    
}
