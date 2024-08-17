package joao.domain.repository;

import joao.domain.entiny.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
//nao é nescessario pois jpaRepository ja indica que é um repository
public interface Clientes extends JpaRepository<Cliente, Integer> {

    //HQL >
//    @Query(value = " select c from Cliente c where c.nome like :nome")

    //SQL NATIVO >
    @Query(value = "select * from cliente c where c.nome like %:nome%", nativeQuery = true)
    List<Cliente> encontrarPorNome(@Param("nome") String nome);

    //Query ""pronta"" >
//    List<Cliente> findByNomeLikeOrIdOrderById(String nome, Integer id);

    //So com 1, nao com lista
    @Query("delete from Cliente c where c.nome =:nome")
    //Dizer que vai fazer uma modificacao na tabela
    @Modifying
    void deleteByNome(String nome);

    boolean existsByNome(String nome);

    //Buscar todods os Clientes com os pedidos >
    @Query("select c from Cliente c left join fetch c.pedidos p where c.id =:id ")
    Cliente findClienteFetchPedidos(@Param("id") Integer id);
}
