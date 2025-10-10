package backend.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import backend.backend.model.Reporte;

public  interface ReporteRepository extends JpaRepository<Reporte, Long> {
}

