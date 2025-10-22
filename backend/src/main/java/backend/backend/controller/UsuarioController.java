package backend.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.backend.dto.UsuarioRequest;
import backend.backend.dto.UsuarioResponse;
import backend.backend.model.Usuario;
import backend.backend.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    
    // 1️ Listar todos los usuarios
    @GetMapping
    public List<UsuarioResponse> listarUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(usuario -> new UsuarioResponse(
                        usuario.getIdUsuario(),
                        usuario.getUsername(),
                        usuario.getRol().name(),
                        usuario.getEmail()
                ))
                .collect(Collectors.toList());
    }

    // 2️ Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtenerUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        return usuario.map(u -> ResponseEntity.ok(
                        new UsuarioResponse(
                                u.getIdUsuario(),
                                u.getUsername(),
                                u.getRol().name(),
                                u.getEmail()
                        )
                ))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3️ Crear nuevo usuario (rol por defecto = USER)
    @PostMapping
    public ResponseEntity<UsuarioResponse> crearUsuario(@RequestBody UsuarioRequest request) {
        try {
            Usuario nuevoUsuario = Usuario.builder()
                    .username(request.getUsername())
                    .password(request.getPassword())
                    .email(request.getEmail())
                    .rol(request.getRole() != null
                            ? Usuario.Rol.valueOf(request.getRole().toUpperCase())
                            : Usuario.Rol.USER) // Por defecto USER
                    .build();

            Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);

            UsuarioResponse response = new UsuarioResponse(
                    usuarioGuardado.getIdUsuario(),
                    usuarioGuardado.getUsername(),
                    usuarioGuardado.getRol().name(),
                    usuarioGuardado.getEmail()
            );

            return ResponseEntity.status(201).body(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // 4️ Actualizar usuario (permite cambiar rol si lo desea)
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody UsuarioRequest request) {

        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setUsername(request.getUsername());
                    usuario.setPassword(request.getPassword());
                    usuario.setEmail(request.getEmail());
                    if (request.getRole() != null) {
                        usuario.setRol(Usuario.Rol.valueOf(request.getRole().toUpperCase()));
                    }
                    Usuario usuarioActualizado = usuarioRepository.save(usuario);

                    UsuarioResponse response = new UsuarioResponse(
                            usuarioActualizado.getIdUsuario(),
                            usuarioActualizado.getUsername(),
                            usuarioActualizado.getRol().name(),
                            usuarioActualizado.getEmail()
                    );
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 5️ Eliminar usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
