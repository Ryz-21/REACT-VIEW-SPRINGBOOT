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
    // bean es un objeto que es instanciado, ensamblado y gestionado por un contenedor de IoC (Inversion of Control)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //http es el objeto que configura la seguridad de la aplicacion
        //htppsecurity es una clase que permite configurar la seguridad de la aplicacion
        http
            .csrf(csrf -> csrf.disable())//csrf es un ataque que consiste en enviar peticiones no autorizadas desde un usuario autenticado
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); //autoriza todas las peticiones sin autenticacion
        return http.build();//construye el objeto de seguridad
    }
}
