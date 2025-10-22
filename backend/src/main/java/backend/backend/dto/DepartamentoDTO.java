package backend.backend.dto;
import  lombok.AllArgsConstructor;
import  lombok.Builder;
import  lombok.Data;
import  lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// DTO (Data Transfer Object) para la entidad Departamento.
// Se utiliza para enviar/recibir datos sin exponer información sensible.

public class DepartamentoDTO {
    private String nombre;
    private String ubicacion;
    private String descripcion;    
}
