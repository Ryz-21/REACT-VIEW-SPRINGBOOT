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

import backend.backend.dto.DepartamentoRequest;
import backend.backend.dto.DepartamentoResponse;
import backend.backend.model.Departamento;
import backend.backend.repository.DepartamentoRepository;

@RestController
@RequestMapping("/api/departamentos")
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend
public class DepartamentoController {

    @Autowired // Inyección de dependencias 
    private DepartamentoRepository departamentoRepository;

    //  1. Listar todos los departamentos (usando DTO de salida)
    @GetMapping //ruta para listar todos los departamentos get es para obtener datos
    public List<DepartamentoResponse> listarDepartamentos() {
        return departamentoRepository.findAll()
                .stream()
                .map(d -> new DepartamentoResponse(
                        d.getIdDepartamento(),
                        d.getNombre(),
                        d.getDescripcion()
                ))
                .collect(Collectors.toList());
    }

    //  2. Obtener un departamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<DepartamentoResponse> obtenerDepartamentoPorId(@PathVariable Long id) {
        Optional<Departamento> departamento = departamentoRepository.findById(id);

        return departamento.map(d -> ResponseEntity.ok(
                        new DepartamentoResponse(
                                d.getIdDepartamento(),
                                d.getNombre(),
                                d.getDescripcion()
                        )
                ))

                //notfund es una respuesta http que indica que no se encontro el recurso
                .orElseGet(() -> ResponseEntity.notFound().build());
                //build es para construir la respuesta
    }

    //  3. Agregar un nuevo departamento
    @PostMapping
    public ResponseEntity<DepartamentoResponse> agregarDepartamento(@RequestBody DepartamentoRequest request) {
        try {
            Departamento nuevo = Departamento.builder()
                    .nombre(request.getNombre())
                    .descripcion(request.getDescripcion())
                    .build();

            Departamento guardado = departamentoRepository.save(nuevo);

            DepartamentoResponse respuesta = new DepartamentoResponse(
                    guardado.getIdDepartamento(),
                    guardado.getNombre(),
                    guardado.getDescripcion()
            );

            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 4. Actualizar un departamento existente
    @PutMapping("/{id}")
    public ResponseEntity<DepartamentoResponse> actualizarDepartamento(
            @PathVariable Long id,
            @RequestBody DepartamentoRequest request) {

        return departamentoRepository.findById(id)
                .map(departamento -> {
                    departamento.setNombre(request.getNombre());
                    departamento.setDescripcion(request.getDescripcion());
                    Departamento actualizado = departamentoRepository.save(departamento);

                    DepartamentoResponse respuesta = new DepartamentoResponse(
                            actualizado.getIdDepartamento(),
                            actualizado.getNombre(),
                            actualizado.getDescripcion()
                    );

                    return ResponseEntity.ok(respuesta);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //  5. Eliminar un departamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDepartamento(@PathVariable Long id) {
        if (departamentoRepository.existsById(id)) {
            departamentoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
