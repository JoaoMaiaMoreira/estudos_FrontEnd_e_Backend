package org.example.repository;

import org.example.entiny.Carta;
import org.example.entiny.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
   Optional<Usuario> findByEmail(String email);
}
