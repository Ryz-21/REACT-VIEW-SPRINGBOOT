package backend.backend.controller;

import java.util.List;
import java.util.Optional;

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
    public List<Reporte> listarReportes(){
        return reporteRepository.findAll();
    }

    //2. Listar reporte por ID
    @GetMapping("/{id}")
    public ResponseEntity<Reporte> obtenerReportePorId(@PathVariable Long id){
        Optional<Reporte> reporte=reporteRepository.findById(id);
        return reporte.map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.notFound().build());
    }

    //3. Agregar reporte
    @PostMapping
    public ResponseEntity<Reporte> agregarReporte(@RequestBody Reporte reporte){
        try{
            Reporte nuevoReporte=reporteRepository.save(reporte);
            return ResponseEntity.ok(nuevoReporte);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    //4. Modificar reporte
    @PutMapping("/{id}")
    public ResponseEntity<Reporte> actualizarReporte(@PathVariable Long id,@RequestBody Reporte reporte
    ){
        return reporteRepository.findById(id)
                .map(reporteExistente->{
                    reporteExistente.setTitulo(reporte.getTitulo());
                    reporteExistente.setDescripcion(reporte.getDescripcion());
                    reporteExistente.setFechaCreacion(reporte.getFechaCreacion());
                    Reporte actualizado=reporteRepository.save(reporteExistente);
                    return ResponseEntity.ok(actualizado);
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