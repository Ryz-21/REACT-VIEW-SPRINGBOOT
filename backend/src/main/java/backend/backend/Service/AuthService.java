package backend.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.dto.UsuarioRequest;
import backend.backend.dto.UsuarioResponse;
import backend.backend.dto.AuthResponse;
import backend.backend.dto.ErrorResponse;
import backend.backend.model.Usuario;
import backend.backend.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;

    /**
     * Convierte un Usuario a UsuarioResponse DTO
     */
    public UsuarioResponse usuarioToResponse(Usuario usuario) {
        if (usuario == null) {
            return null;
        }
        return new UsuarioResponse(
            usuario.getIdUsuario(),
            usuario.getUsername(),
            usuario.getRol().name(),
            usuario.getEmail()
        );
    }

    /**
     * Valida credenciales de login
     */
    public AuthResponse validarLogin(String email, String password) {
        if (email == null || password == null) {
            throw new IllegalArgumentException("Email y password son requeridos");
        }

        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        
        if (usuario.isEmpty()) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }

        Usuario user = usuario.get();
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getEmail());
        UsuarioResponse usuarioResponse = usuarioToResponse(user);

        return new AuthResponse(
            token,
            "Login exitoso. Bienvenido, " + user.getUsername(),
            usuarioResponse
        );
    }

    /**
     * Registra un nuevo usuario
     */
    public AuthResponse registrarUsuario(UsuarioRequest request) {
        String username = request.getUsername();
        String email = request.getEmail();
        String password = request.getPassword();

        if (username == null || email == null || password == null) {
            throw new IllegalArgumentException("Username, email y password son requeridos");
        }

        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }

        boolean usernameExists = usuarioRepository.findAll()
                .stream()
                .anyMatch(u -> u.getUsername().equalsIgnoreCase(username));

        if (usernameExists) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso");
        }

        Usuario nuevoUsuario = Usuario.builder()
                .username(username)
                .email(email)
                .password(password)
                .rol(Usuario.Rol.USER)
                .build();

        Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);
        UsuarioResponse usuarioResponse = usuarioToResponse(usuarioGuardado);

        return new AuthResponse(
            null,
            "Usuario registrado con éxito",
            usuarioResponse
        );
    }

    /**
     * Genera código para recuperación de contraseña
     */
    public void generarCodigoRecuperacion(String email) {
        if (email == null) {
            throw new IllegalArgumentException("El email es obligatorio");
        }

        Optional<Usuario> usuario = usuarioRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email))
                .findFirst();

        if (usuario.isEmpty()) {
            throw new IllegalArgumentException("No existe un usuario con ese correo");
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
        user.setResetTokenExpiration(LocalDateTime.now().plusMinutes(10));
        usuarioRepository.save(user);

        // Enviar correo con el código
        emailService.enviarCorreo(
            email,
            "Código de recuperación de contraseña",
            "Hola " + user.getUsername() + ",\n\nTu código de recuperación es: " + verificationCode +
            "\n\nEste código expira en 10 minutos."
        );
    }

    /**
     * Restablece contraseña con token
     */
    public void restablecerContraseña(String token, String newPassword) {
        if (token == null || newPassword == null) {
            throw new IllegalArgumentException("Token y newPassword son requeridos");
        }

        Optional<Usuario> usuario = usuarioRepository.findAll()
                .stream()
                .filter(u -> token.equals(u.getResetToken()))
                .findFirst();

        if (usuario.isEmpty()) {
            throw new IllegalArgumentException("Token inválido o expirado");
        }

        Usuario user = usuario.get();
        if (user.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Token expirado");
        }

        user.setPassword(newPassword);
        user.setResetToken(null);
        user.setResetTokenExpiration(null);
        usuarioRepository.save(user);
    }

    /**
     * Verifica código y restablece contraseña
     */
    public void verificarCodigoYRestablecer(String code, String newPassword) {
        if (code == null || newPassword == null) {
            throw new IllegalArgumentException("Code y newPassword son requeridos");
        }

        Optional<Usuario> usuario = usuarioRepository.findAll()
                .stream()
                .filter(u -> code.equals(u.getResetToken()))
                .findFirst();

        if (usuario.isEmpty()) {
            throw new IllegalArgumentException("Código inválido o expirado");
        }

        Usuario user = usuario.get();

        if (user.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("El código ha expirado");
        }

        user.setPassword(newPassword);
        user.setResetToken(null);
        user.setResetTokenExpiration(null);
        usuarioRepository.save(user);
    }

    /**
     * Procesa login OAuth2 (Google, Facebook, GitHub)
     */
    public AuthResponse procesarLoginOAuth2(String email, String name) {
        if (email == null || name == null) {
            throw new IllegalArgumentException("Email y name son requeridos");
        }

        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(email);

        Usuario usuario;
        if (usuarioExistente.isEmpty()) {
            usuario = Usuario.builder()
                .username(name)
                .email(email)
                .password("oauth2")
                .rol(Usuario.Rol.USER)
                .build();
            usuario = usuarioRepository.save(usuario);
        } else {
            usuario = usuarioExistente.get();
        }

        String token = jwtService.generateToken(usuario.getUsername(), usuario.getEmail());

        return new AuthResponse(
            token,
            "Login exitoso. Bienvenido, " + usuario.getUsername(),
            usuarioToResponse(usuario)
        );
    }
}
