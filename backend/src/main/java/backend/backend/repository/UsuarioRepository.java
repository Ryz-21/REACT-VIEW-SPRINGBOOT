package backend.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.backend.model.Usuario;

//jpa es una interfaz que permite hacer operaciones basicas de base de datos
//repositorio es una interfaz que permite hacer operaciones mas avanzadas de base de datos
//java optional es una clase que permite manejar valores nulos
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsername(String username);
}