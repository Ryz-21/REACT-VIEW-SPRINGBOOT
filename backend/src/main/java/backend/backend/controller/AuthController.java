package backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import backend.backend.Service.EmailService;
import backend.backend.model.Usuario;
import backend.backend.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private  EmailService emailService;
    // 🔹 Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        return usuarioRepository.findByUsername(username)
                .map(usuario -> {
                    if (usuario.getPassword().equals(password)) {
                        return ResponseEntity.ok("✅ Login exitoso. Bienvenido, " + usuario.getUsername());
                    } else {
                        return ResponseEntity.status(401).body("❌ Contraseña incorrecta");
                    }
                })
                .orElse(ResponseEntity.status(404).body("❌ Usuario no encontrado"));
    }

    // 🔹 Registro (signup)
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username,
                                           @RequestParam String email,
                                           @RequestParam String password) {
        if (usuarioRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body("❌ El nombre de usuario ya está en uso");
        }

        if (usuarioRepository.findAll().stream().anyMatch(u -> u.getEmail().equalsIgnoreCase(email))) {
            return ResponseEntity.badRequest().body("❌ El correo ya está registrado");
        }

        Usuario nuevoUsuario = Usuario.builder()
                .username(username)
                .email(email)
                .password(password)
                .rol(Usuario.Rol.USER)
                .build();

        usuarioRepository.save(nuevoUsuario);
        return ResponseEntity.ok("✅ Usuario registrado con éxito");
    }

    //  enviar correo de recuperacion de contraseña
     @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        var usuario = usuarioRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email))
                .findFirst();

        if (usuario.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ No existe un usuario con ese correo.");
        }

        Usuario user = usuario.get();
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiration(LocalDateTime.now().plusMinutes(15));
        usuarioRepository.save(user);

        String link = "http://localhost:8080/api/auth/reset-password?token=" + token;
        emailService.enviarCorreo(email, "Recuperación de contraseña",
                "Hola " + user.getUsername() + ",\n\nUsa este enlace para restablecer tu contraseña:\n" + link + "\n\nExpira en 15 minutos.");

        return ResponseEntity.ok("✅ Se envió un correo con el enlace de recuperación.");
    }

}
