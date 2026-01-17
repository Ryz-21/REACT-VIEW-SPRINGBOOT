package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Respuesta de autenticación con token y usuario
public class AuthResponse {
    private String token;
    private String message;
    private UsuarioResponse usuario;
}
