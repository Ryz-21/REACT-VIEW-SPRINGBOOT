package backend.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import backend.backend.model.Empleado;
import backend.backend.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController//indica que es un controlador rest
@RequestMapping("/api/empleados")//ruta base para acceder a los endpoints
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend (opcional)

public class EmpleadoController {
    @Autowired//inyeccion de dependencias
    private EmpleadoRepository empleadoRepository;
    //1. Listar todos los empleados
    @GetMapping
    public List<Empleado> listarEmpleados(){
        return empleadoRepository.findAll();
    }
    //2. Listar empleado por ID
    @GetMapping("/{id}")
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Long id){
        Optional<Empleado> empleado=empleadoRepository.findById(id);
        return empleado.map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    //3. Agregar empleado
    @PostMapping//ruta para agregar un empleado
    public ResponseEntity<Empleado> agregarEmpleado(@RequestBody Empleado empleado){
        try{
            Empleado nuevoEmpleado=empleadoRepository.save(empleado);
            return ResponseEntity.ok(nuevoEmpleado);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    //4. Modificar empleado
    @PutMapping("/{id}")//ruta para modificar un empleado
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Long id,@RequestBody Empleado empleado
    ){
        return empleadoRepository.findById(id)
                .map(empleadoExistente->{
                    empleadoExistente.setNombres(empleado.getNombres());
                    empleadoExistente.setApellidos(empleado.getApellidos());
                    empleadoExistente.setEmail(empleado.getEmail());
                    empleadoExistente.setTelefono(empleado.getTelefono());
                    empleadoExistente.setDepartamento(empleado.getDepartamento());
                    Empleado actualizado=empleadoRepository.save(empleadoExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    //5. Eliminar empleado
    @DeleteMapping("/{id}")//ruta para eliminar un empleado
    public ResponseEntity<Void> eliminarEmpleado(@PathVariable Long id){
        return empleadoRepository.findById(id)
                .map(empleado->{
                    empleadoRepository.delete(empleado);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(()->ResponseEntity.notFound().build());
    }

}
          

