package backend.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.Service.AuthService;
import backend.backend.dto.UsuarioRequest;
import backend.backend.dto.AuthResponse;
import backend.backend.dto.ErrorResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");

            AuthResponse authResponse = authService.validarLogin(email, password);
            return ResponseEntity.ok(authResponse);
        } catch (IllegalArgumentException e) {
            ErrorResponse error = new ErrorResponse(
                "Autenticación fallida",
                e.getMessage(),
                e.getMessage().contains("no encontrado") ? 404 : 401
            );
            int statusCode = e.getMessage().contains("no encontrado") ? 404 : 401;
            return ResponseEntity.status(statusCode).body(error);
        }
    }


@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody UsuarioRequest request) {
    try {
        AuthResponse authResponse = authService.registrarUsuario(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    } catch (IllegalArgumentException e) {
        ErrorResponse error = new ErrorResponse("Registro fallido", e.getMessage(), 400);
        return ResponseEntity.badRequest().body(error);
    }
}


    // RECUPERAR CONTRASEÑA
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            authService.generarCodigoRecuperacion(email);
            
            AuthResponse response = new AuthResponse(
                null,
                "Se envió un código de verificación al correo.",
                null
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            ErrorResponse error = new ErrorResponse(
                "Error",
                e.getMessage(),
                e.getMessage().contains("no existe") ? 404 : 400
            );
            int statusCode = e.getMessage().contains("no existe") ? 404 : 400;
            return ResponseEntity.status(statusCode).body(error);
        }
    } 
    //  RESTABLECER CONTRASEÑA
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");
            
            authService.restablecerContraseña(token, newPassword);
            
            AuthResponse response = new AuthResponse(
                null,
                "Contraseña restablecida con éxito.",
                null
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            ErrorResponse error = new ErrorResponse("Error", e.getMessage(), 400);
            return ResponseEntity.badRequest().body(error);
        }
    }

@PostMapping("/verify-code")
public ResponseEntity<?> verifyCodeAndResetPassword(@RequestBody Map<String, String> request) {
    try {
        String code = request.get("code");
        String newPassword = request.get("newPassword");
        
        authService.verificarCodigoYRestablecer(code, newPassword);
        
        AuthResponse response = new AuthResponse(
            null,
            "Contraseña restablecida correctamente.",
            null
        );
        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException e) {
        ErrorResponse error = new ErrorResponse("Error", e.getMessage(), 400);
        return ResponseEntity.badRequest().body(error);
    }
}
//inicar sesion con google
  @GetMapping("/oauth2/success")
    public ResponseEntity<Void> success(@AuthenticationPrincipal OAuth2User oauthUser) {
        try {
            String email = oauthUser.getAttribute("email");
            String name = oauthUser.getAttribute("name");

            AuthResponse authResponse = authService.procesarLoginOAuth2(email, name);
            String token = authResponse.getToken();

            // Redirigir al frontend con el token
            return ResponseEntity.status(302).header("Location", "http://localhost:3000/login?token=" + token).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(302).header("Location", "http://localhost:3000/login?error=" + e.getMessage()).build();
        }
    }
//inciar sesion con facebook
    @GetMapping("/oauth2/facebook/success")
    public ResponseEntity<Void> facebookSuccess(@AuthenticationPrincipal OAuth2User oauthUser) {
        try {
            String email = oauthUser.getAttribute("email");
            String name = oauthUser.getAttribute("name");

            AuthResponse authResponse = authService.procesarLoginOAuth2(email, name);
            String token = authResponse.getToken();

            return ResponseEntity.status(302).header("Location", "http://localhost:3000/login?token=" + token).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(302).header("Location", "http://localhost:3000/login?error=" + e.getMessage()).build();
        }
    }

    // inicar sesion con github
    @GetMapping("/oauth2/github/success")
    public ResponseEntity<Void> githubSuccess(@AuthenticationPrincipal OAuth2User oauthUser) {
        try {
            String email = oauthUser.getAttribute("email");
            String name = oauthUser.getAttribute("name");

            AuthResponse authResponse = authService.procesarLoginOAuth2(email, name);
            String token = authResponse.getToken();

            return ResponseEntity.status(302).header("Location", "http://localhost:3000/login?token=" + token).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(302).header("Location", "http://localhost:3000/login?error=" + e.getMessage()).build();
        }
    }
    
}

