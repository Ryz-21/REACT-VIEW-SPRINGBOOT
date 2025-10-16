package backend.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.dto.ReporteResponse;
import backend.backend.model.Reporte;
import backend.backend.repository.ReporteRepository;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")

public class ReporteController {

    @Autowired//inyeccion de dependencias
    private ReporteRepository reporteRepository;

    //1. Listar todos los reportes
  @GetMapping
public List<ReporteResponse> listarReportes() {
    return reporteRepository.findAll()
            .stream()
            .map(r -> new ReporteResponse(
                    r.getIdReporte(),
                    r.getTitulo(),
                    r.getDescripcion(),
                    r.getFechaCreacion(),
                    r.getEmpleado() != null ? r.getEmpleado().getNombres() + " " + r.getEmpleado().getApellidos() : null,
                    r.getUsuario() != null ? r.getUsuario().getUsername() : null,
                    r.getDepartamento() != null ? r.getDepartamento().getNombre() : null
            ))
            .collect(Collectors.toList());
}


    //2. Listar reporte por ID
    @GetMapping("/{id}")
    public ResponseEntity<ReporteResponse> obtenerReportePorId(@PathVariable Long id){
        Optional<Reporte> reporte=reporteRepository.findById(id);
        return reporte.map(r->ResponseEntity.ok(
                new ReporteResponse(
                        r.getIdReporte(),
                        r.getTitulo(),
                        r.getDescripcion(),
                        r.getFechaCreacion(),
                        r.getEmpleado() != null ? r.getEmpleado().getNombres() + " " + r.getEmpleado().getApellidos() : null,
                        r.getUsuario() != null ? r.getUsuario().getUsername() : null,
                        r.getDepartamento() != null ? r.getDepartamento().getNombre() : null
                )
        ))
        .orElseGet(()->ResponseEntity.notFound().build());
    }
    //3. Agregar reporte
    @PostMapping
    public ResponseEntity<ReporteResponse> agregarReporte(@RequestBody Reporte reporte){
        try{
            Reporte nuevo=reporteRepository.save(reporte);
            ReporteResponse response=new ReporteResponse(
                    nuevo.getIdReporte(),
                    nuevo.getTitulo(),
                    nuevo.getDescripcion(),
                    nuevo.getFechaCreacion(),
                    nuevo.getEmpleado() != null ? nuevo.getEmpleado().getNombres() + " " + nuevo.getEmpleado().getApellidos() : null,
                    nuevo.getUsuario() != null ? nuevo.getUsuario().getUsername() : null,
                    nuevo.getDepartamento() != null ? nuevo.getDepartamento().getNombre() : null
            );
            return ResponseEntity.ok(response);
        }catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }
    //4. Modificar reporte
    @PutMapping("/{id}")
    public ResponseEntity<ReporteResponse> modificarReporte(@PathVariable Long id, @RequestBody Reporte reporte){
        return reporteRepository.findById(id)
                .map(r->{
                    r.setTitulo(reporte.getTitulo());
                    r.setDescripcion(reporte.getDescripcion());
                    r.setFechaCreacion(reporte.getFechaCreacion());
                    r.setEmpleado(reporte.getEmpleado());
                    r.setUsuario(reporte.getUsuario());
                    r.setDepartamento(reporte.getDepartamento());
                    Reporte actualizado=reporteRepository.save(r);
                    ReporteResponse response=new ReporteResponse(
                            actualizado.getIdReporte(),
                            actualizado.getTitulo(),
                            actualizado.getDescripcion(),
                            actualizado.getFechaCreacion(),
                            actualizado.getEmpleado() != null ? actualizado.getEmpleado().getNombres() + " " + actualizado.getEmpleado().getApellidos() : null,
                            actualizado.getUsuario() != null ? actualizado.getUsuario().getUsername() : null,
                            actualizado.getDepartamento() != null ? actualizado.getDepartamento().getNombre() : null
                    );
                    return ResponseEntity.ok(response);
                })
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    //5. Eliminar reporte
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReporte(@PathVariable Long id){
        return reporteRepository.findById(id)
                .map(reporte->{
                    reporteRepository.delete(reporte);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(()->ResponseEntity.notFound().build());
    }
}