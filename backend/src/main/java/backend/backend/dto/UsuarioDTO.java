package backend.backend.dto;

import backend.backend.model.Usuario.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO (Data Transfer Object) para la entidad Usuario.
 * Se utiliza para enviar/recibir datos sin exponer información sensible.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {

    private Integer idUsuario;
    private String username;
    private Rol rol;
    private boolean estado;
    private LocalDateTime creadoEn;
}
