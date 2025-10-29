package backend.backend.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.Service.EmailService;
import backend.backend.dto.UsuarioRequest;
import backend.backend.model.Usuario;
import backend.backend.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    //cambiamos RequestParam por RequestBody para mayor seguridad
    //  Requestparam sirve para enviar datos por la URL, lo cual no es seguro para datos sensibles como contraseñas.
    // En cambio, RequestBody permite enviar datos en el cuerpo de la solicitud HTTP, protegiendo mejor la información sensible.
    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    String password = request.get("password");

    if (email == null || password == null) {
        return ResponseEntity.badRequest().body("Faltan campos requeridos (email, password)");
    }

    return usuarioRepository.findByEmail(email)
            .map(usuario -> {
                if (usuario.getPassword().equals(password)) {
                    return ResponseEntity.ok("Login exitoso. Bienvenido, " + usuario.getUsername());
                } else {
                    return ResponseEntity.status(401).body("Contraseña incorrecta");
                }
            })
            .orElse(ResponseEntity.status(404).body("Usuario no encontrado"));
}


@PostMapping("/register")
public ResponseEntity<String> register(@RequestBody UsuarioRequest request) {
    String username = request.getUsername();
    String email = request.getEmail();
    String password = request.getPassword();

    if (username == null || email == null || password == null) {
        return ResponseEntity.badRequest().body("Faltan campos requeridos");
    }

    // Verificar si el email ya está registrado
    if (usuarioRepository.findByEmail(email).isPresent()) {
        return ResponseEntity.badRequest().body("El correo ya está registrado");
    }

    // Verificar si el username ya está en uso
    boolean usernameExists = usuarioRepository.findAll()
            .stream()
            .anyMatch(u -> u.getUsername().equalsIgnoreCase(username));

    if (usernameExists) {
        return ResponseEntity.badRequest().body("El nombre de usuario ya está en uso");
    }

    // Crear nuevo usuario
    Usuario nuevoUsuario = Usuario.builder()
            .username(username)
            .email(email)
            .password(password)
            .rol(Usuario.Rol.USER)
            .build();

    usuarioRepository.save(nuevoUsuario);

    return ResponseEntity.ok("Usuario registrado con éxito");
}


    // RECUPERAR CONTRASEÑA
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
     String email = request.get("email");

    if (email == null) {
        return ResponseEntity.badRequest().body("El campo 'email' es obligatorio.");
    }

    var usuario = usuarioRepository.findAll()
            .stream()
            .filter(u -> u.getEmail().equalsIgnoreCase(email))
            .findFirst();

    if (usuario.isEmpty()) {
        return ResponseEntity.badRequest().body("No existe un usuario con ese correo.");
    }

    Usuario user = usuario.get();

    // Generar código alfanumérico de 6 caracteres
    String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    StringBuilder verificationCode = new StringBuilder();
    for (int i = 0; i < 6; i++) {
        int index = (int) (Math.random() * chars.length());
        verificationCode.append(chars.charAt(index));
    }

    user.setResetToken(verificationCode.toString());
    user.setResetTokenExpiration(LocalDateTime.now().plusMinutes(10)); // expira en 10 minutos
    usuarioRepository.save(user);

    // Enviar correo con el código
    emailService.enviarCorreo(
        email,
        "Código de recuperación de contraseña",
        "Hola " + user.getUsername() + ",\n\nTu código de recuperación es: " + verificationCode +
        "\n\nEste código expira en 10 minutos."
    );

    return ResponseEntity.ok("Se envió un código de verificación al correo.");
    } 
    //  RESTABLECER CONTRASEÑA
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        if (token == null || newPassword == null) {
            return ResponseEntity.badRequest().body(" Faltan campos requeridos (token, newPassword)");
        }

        var usuario = usuarioRepository.findAll()
                .stream()
                .filter(u -> token.equals(u.getResetToken()))
                .findFirst();

        if (usuario.isEmpty()) {
            return ResponseEntity.badRequest().body(" Token inválido o expirado.");
        }

        Usuario user = usuario.get();
        if (user.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(" Token expirado.");
        }

        user.setPassword(newPassword);
        user.setResetToken(null);
        user.setResetTokenExpiration(null);
        usuarioRepository.save(user);

        return ResponseEntity.ok(" Contraseña restablecida con éxito.");
    }

@PostMapping("/verify-code")
public ResponseEntity<String> verifyCodeAndResetPassword(@RequestBody Map<String, String> request) {
    String code = request.get("code");
    String newPassword = request.get("newPassword");

    if (code == null || newPassword == null) {
        return ResponseEntity.badRequest().body("Faltan campos requeridos (code, newPassword)");
    }

    var usuario = usuarioRepository.findAll()
            .stream()
            .filter(u -> code.equals(u.getResetToken()))
            .findFirst();

    if (usuario.isEmpty()) {
        return ResponseEntity.badRequest().body("Código inválido o expirado.");
    }

    Usuario user = usuario.get();

    if (user.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
        return ResponseEntity.badRequest().body("El código ha expirado.");
    }

    user.setPassword(newPassword);
    user.setResetToken(null);
    user.setResetTokenExpiration(null);
    usuarioRepository.save(user);

    return ResponseEntity.ok("Contraseña restablecida correctamente.");
}

//inicar sesion con google

}
