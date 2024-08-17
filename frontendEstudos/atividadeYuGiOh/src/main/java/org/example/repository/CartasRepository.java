package org.example.repository;

import org.example.entiny.Carta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface CartasRepository extends JpaRepository<Carta, Integer> {

    boolean existsByNome(String nome);

    @Query(value = "select * from carta c where c.nome ilike %:nome%", nativeQuery = true)
    List<Carta> findByNome(@Param("nome") String nome);


}
