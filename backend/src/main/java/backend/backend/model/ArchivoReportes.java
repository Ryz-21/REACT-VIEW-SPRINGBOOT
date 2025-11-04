package backend.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "archivos_reportes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArchivoReportes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_archivo;

    @Column(length = 100, nullable = false)
    private String nombre;

    @Column(length = 20, nullable = false)
    private String tipo; // pdf o excel

    @Builder.Default
    @Column(name = "fecha_generacion", nullable = false)
    private LocalDateTime fecha_generacion = LocalDateTime.now();

    @Lob
    @Column(name = "datos", columnDefinition = "LONGBLOB")
    private byte[] contenido;
}
