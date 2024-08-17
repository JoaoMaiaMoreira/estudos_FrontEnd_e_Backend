package yugiohProjetoComSecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yugiohProjetoComSecurity.demo.entiny.Carta;

import java.util.List;

@Repository
public interface CartasRepository extends JpaRepository<Carta, Integer> {

    boolean existsByNome(String nome);

    @Query(value = "select * from carta c where c.nome ilike %:nome%", nativeQuery = true)
    List<Carta> findByNome(@Param("nome") String nome);


}
