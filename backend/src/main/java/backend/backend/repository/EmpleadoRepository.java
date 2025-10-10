package backend.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import backend.backend.model.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}
