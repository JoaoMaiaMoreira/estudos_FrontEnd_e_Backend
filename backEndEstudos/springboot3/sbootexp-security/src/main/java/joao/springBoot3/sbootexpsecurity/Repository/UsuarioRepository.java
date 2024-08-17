package joao.springBoot3.sbootexpsecurity.Repository;

import joao.springBoot3.sbootexpsecurity.api.DTO.UsuarioDTO;
import joao.springBoot3.sbootexpsecurity.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    Optional<Usuario> findByLogin(String login);
    //find by e nome da variavel da base, o spring ja faz a consulta e retorna
}
