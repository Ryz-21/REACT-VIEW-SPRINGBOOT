package backend.backend.repository;

import backend.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

//jpa es una interfaz que permite hacer operaciones basicas de base de datos
//repositorio es una interfaz que permite hacer operaciones mas avanzadas de base de datos
//java optional es una clase que permite manejar valores nulos
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsername(String username);
}