package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// informacion que se recibe del cliente
public class UsuarioRequest {
    private String username;
    private String password;
    private String email;
    private String role;
}

