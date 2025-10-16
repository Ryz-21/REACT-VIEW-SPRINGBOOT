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

import backend.backend.dto.UsuarioResponse;
import backend.backend.model.Usuario;
import backend.backend.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend (opcional)
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 1. Listar todos los usuarios
    @GetMapping
    public List<UsuarioResponse> listarUsuarios() {
    List<Usuario> usuarios = usuarioRepository.findAll();
    return usuarios.stream()
            .map(usuario -> new UsuarioResponse(
                    usuario.getIdUsuario(),
                    usuario.getUsername(),
                    usuario.getRol().name()
            ))
            .collect(Collectors.toList());
    }

    // ✅ 2. Listar usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtenerUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        return usuario.map(u -> ResponseEntity.ok(
                        new UsuarioResponse(
                                u.getIdUsuario(),
                                u.getUsername(),
                                u.getRol().name()
                        )
                ))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. Agregar usuario
    @PostMapping
    public ResponseEntity<UsuarioResponse> crearUsuario(@RequestBody Usuario nuevoUsuario) {
        Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);
        UsuarioResponse usuarioResponse = new UsuarioResponse(
                usuarioGuardado.getIdUsuario(),
                usuarioGuardado.getUsername(),
                usuarioGuardado.getRol().name()
        );
        return ResponseEntity.status(201).body(usuarioResponse); // 201 Created
    }

    //4. Modificar usuario
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setUsername(usuarioActualizado.getUsername());
                    usuario.setPassword(usuarioActualizado.getPassword());
                    usuario.setRol(usuarioActualizado.getRol());
                    Usuario usuarioGuardado = usuarioRepository.save(usuario);
                    UsuarioResponse usuarioResponse = new UsuarioResponse(
                            usuarioGuardado.getIdUsuario(),
                            usuarioGuardado.getUsername(),
                            usuarioGuardado.getRol().name()
                    );
                    return ResponseEntity.ok(usuarioResponse);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ 5. Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long  id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }
}
