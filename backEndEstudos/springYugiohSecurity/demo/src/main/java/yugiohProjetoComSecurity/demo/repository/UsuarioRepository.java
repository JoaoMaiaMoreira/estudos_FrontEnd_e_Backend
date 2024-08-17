package yugiohProjetoComSecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import yugiohProjetoComSecurity.demo.entiny.Usuario;

import java.util.Optional;
//a tabela e o tipo de primary key
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
//   Optional<Usuario> findByEmail(String email); //antes
   UserDetails findByEmail(String email); //depois
}
