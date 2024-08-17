package joao.domain.repository;

import joao.domain.entiny.ItemPedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsPedidos extends JpaRepository<ItemPedido, Integer> {
}
