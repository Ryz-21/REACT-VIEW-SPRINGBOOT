package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



//request para crear o actualizar un departamento
// request es la informacion que el cliente envia al servidor
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartamentoRequest {
    private String nombre;
    private String descripcion;
}