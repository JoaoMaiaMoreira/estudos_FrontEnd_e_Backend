package joao.springBoot3.sbootexpsecurity.Repository;

import joao.springBoot3.sbootexpsecurity.entity.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GrupoRepository extends JpaRepository<Grupo, String> {
    Optional<Grupo> findByNome(String nome);
}
