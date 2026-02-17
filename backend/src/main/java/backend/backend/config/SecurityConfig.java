package backend.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean // Define el bean de configuración de seguridad
    // bean es un objeto que es instanciado, ensamblado y gestionado por un
    // contenedor de IoC (Inversion of Control)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // http es el objeto que configura la seguridad de la aplicacion
        // htppsecurity es una clase que permite configurar la seguridad de la
        // aplicacion
        http
                .csrf(csrf -> csrf.disable())// csrf es un ataque que consiste en enviar peticiones no autorizadas desde
                                             // un usuario autenticado
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/oauth2/**").permitAll() // Permitir auth endpoints
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .successHandler((request, response, authentication) -> {
                            // Redirigir a los endpoints de success
                            String registrationId = ((org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) authentication)
                                    .getAuthorizedClientRegistrationId();
                            if ("google".equals(registrationId)) {
                                response.sendRedirect("/api/auth/oauth2/success");
                            } else if ("facebook".equals(registrationId)) {
                                response.sendRedirect("/api/auth/oauth2/facebook/success");
                            } else if ("github".equals(registrationId)) {
                                response.sendRedirect("/api/auth/oauth2/github/success");
                            }
                        }));
        return http.build();// construye el objeto de seguridad
    }

    @Bean
    public org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }
}
