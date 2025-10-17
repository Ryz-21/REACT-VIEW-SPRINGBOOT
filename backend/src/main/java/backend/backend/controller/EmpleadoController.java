package backend.backend.controller;

import java.util.List;
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

import backend.backend.dto.EmpleadoResponse;
import backend.backend.exception.ResourceNotFoundException;
import backend.backend.model.Empleado;
import backend.backend.repository.EmpleadoRepository;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    // 1. Listar todos los empleados
    @GetMapping
    public List<EmpleadoResponse> listarEmpleado() {
        return empleadoRepository.findAll()
                .stream()
                .map(e -> new EmpleadoResponse(
                        e.getIdEmpleado(),
                        e.getNombres(),
                        e.getApellidos(),
                        e.getDni(),
                        e.getTelefono(),
                        e.getEmail(),
                        e.getDireccion(),
                        e.getSalario(),
                        e.getFechaIngreso(),
                        e.getFechaSalida(),
                        e.getDepartamento().getIdDepartamento()
                ))
                .collect(Collectors.toList());
    }

    // 2. Obtener empleado por ID
    @GetMapping("/{id}")
    public ResponseEntity<EmpleadoResponse> obtenerEmpleadoPorId(@PathVariable Long id) {
        Empleado e = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + id));

        EmpleadoResponse response = new EmpleadoResponse(
                e.getIdEmpleado(),
                e.getNombres(),
                e.getApellidos(),
                e.getDni(),
                e.getTelefono(),
                e.getEmail(),
                e.getDireccion(),
                e.getSalario(),
                e.getFechaIngreso(),
                e.getFechaSalida(),
                e.getDepartamento().getIdDepartamento()
        );

        return ResponseEntity.ok(response);
    }

    // 3. Agregar empleado
@PostMapping
public ResponseEntity<EmpleadoResponse> agregarEmpleado(@RequestBody Empleado empleado) {
    if (empleado.getDepartamento() == null || empleado.getDepartamento().getIdDepartamento() == null) {
        throw new IllegalArgumentException("El empleado debe tener un departamento asignado.");
    }

    Empleado nuevo = empleadoRepository.save(empleado);
    EmpleadoResponse response = new EmpleadoResponse(
            nuevo.getIdEmpleado(),
            nuevo.getNombres(),
            nuevo.getApellidos(),
            nuevo.getDni(),
            nuevo.getTelefono(),
            nuevo.getEmail(),
            nuevo.getDireccion(),
            nuevo.getSalario(),
            nuevo.getFechaIngreso(),
            nuevo.getFechaSalida(),
            nuevo.getDepartamento().getIdDepartamento()
    );
    return ResponseEntity.ok(response);
}


    // 4. Modificar empleado
 @PutMapping("/{id}")
public ResponseEntity<EmpleadoResponse> actualizarEmpleado(@PathVariable Long id, @RequestBody Empleado empleado) {
    Empleado e = empleadoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + id));

    // No permitir modificar DNI
    if (!e.getDni().equals(empleado.getDni())) {
        throw new IllegalArgumentException("No se puede modificar el DNI de un empleado ya registrado.");
    }

    e.setNombres(empleado.getNombres());
    e.setApellidos(empleado.getApellidos());
    e.setTelefono(empleado.getTelefono());
    e.setEmail(empleado.getEmail());
    e.setDireccion(empleado.getDireccion());
    e.setSalario(empleado.getSalario());
    e.setFechaSalida(empleado.getFechaSalida());
    e.setDepartamento(empleado.getDepartamento());

    Empleado actualizado = empleadoRepository.save(e);

    EmpleadoResponse response = new EmpleadoResponse(
            actualizado.getIdEmpleado(),
            actualizado.getNombres(),
            actualizado.getApellidos(),
            actualizado.getDni(),
            actualizado.getTelefono(),
            actualizado.getEmail(),
            actualizado.getDireccion(),
            actualizado.getSalario(),
            actualizado.getFechaIngreso(),
            actualizado.getFechaSalida(),
            actualizado.getDepartamento().getIdDepartamento()
    );

    return ResponseEntity.ok(response);
}


    // 5. Eliminar empleado
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpleado(@PathVariable Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + id));

        empleadoRepository.delete(empleado);
        return ResponseEntity.noContent().build();
    }
}
