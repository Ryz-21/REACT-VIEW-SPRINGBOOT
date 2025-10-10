package backend.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import backend.backend.model.Departamento;

public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
//JPA ya tiene el metodo findById, no es necesario declararlo nuevamente
}
