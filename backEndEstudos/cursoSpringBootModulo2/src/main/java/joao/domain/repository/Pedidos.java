package joao.domain.repository;

import joao.domain.entiny.Cliente;
import joao.domain.entiny.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface Pedidos extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByCliente(Cliente cliente);

    @Query("SELECT p FROM Pedido p JOIN FETCH p.items WHERE p.id = :id")
    Optional<Pedido> findByIdFetchItens(@Param("id") Integer id);
}
