package backend.backend.repository;
import backend.backend.model.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    Optional<Reporte> findById(Long id);
}
