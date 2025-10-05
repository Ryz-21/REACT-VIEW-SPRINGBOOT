package backend.backend.controller;

import backend.backend.model.Departamento;
import backend.backend.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController//indica que es un controlador rest
@RequestMapping("/api/departamentos")//ruta base para acceder a los endpoints
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend (opcional)
public class DeparartamentoController {
   @Autowired//inyeccion de dependencias
    private DepartamentoRepository departamentoRepository; 
    //1. Listar todos los departamentos
    @GetMapping
    public List<Departamento> listarDepartamentos(){
        return departamentoRepository.findAll();
    }   
    //2. Listar departamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Departamento> obtenerDepartamentoPorId(@PathVariable Long id){
        Optional<Departamento> departamento=departamentoRepository.findById(id);
        return departamento.map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    //3. Agregar departamento
    @PostMapping
    public ResponseEntity<Departamento> agregarDepartamento(@RequestBody Departamento departamento){
        try{
            Departamento nuevoDepartamento=departamentoRepository.save(departamento);
            return ResponseEntity.ok(nuevoDepartamento);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    //4. Modificar departamento
    @PutMapping("/{id}")
    public ResponseEntity<Departamento> actualizarDepartamento(@PathVariable Long id,@RequestBody Departamento departamento
    ){
        return departamentoRepository.findById(id)
                .map(departamentoExistente->{
                    departamentoExistente.setNombre(departamento.getNombre());
                    departamentoExistente.setDescripcion(departamento.getDescripcion());
                    Departamento actualizado=departamentoRepository.save(departamentoExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(()->ResponseEntity.notFound().build());
    }

}
