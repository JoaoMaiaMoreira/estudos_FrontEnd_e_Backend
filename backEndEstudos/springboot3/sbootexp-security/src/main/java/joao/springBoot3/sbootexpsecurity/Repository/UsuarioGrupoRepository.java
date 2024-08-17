package joao.springBoot3.sbootexpsecurity.Repository;

import joao.springBoot3.sbootexpsecurity.entity.Usuario;
import joao.springBoot3.sbootexpsecurity.entity.UsuarioGrupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioGrupoRepository extends JpaRepository<UsuarioGrupo, String> {

    //Selecione os diferentes nomes de grupo de UsuarioGrupo (entidade) ug (apelido) join (junta, atraves, com) ug.grupo g (apelido para os grupos) join ug.usuario u
    //where u = ?1
    @Query("""
                select distinct g.nome
                from UsuarioGrupo ug
                join ug.grupo g
                join ug.usuario u
                where u = ?1
    """)
    List<String> findPermissoesByUsuario(Usuario usuario);
}
