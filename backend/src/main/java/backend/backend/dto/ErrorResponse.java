package backend.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Respuesta de error estándar
public class ErrorResponse {
    private String error;
    private String message;
    private int status;
}
