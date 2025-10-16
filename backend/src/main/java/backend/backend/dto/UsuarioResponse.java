package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// informacion que se envia al cliente
public class UsuarioResponse {
    private Long idUsuario;
    private String username;
    private String role;
}
