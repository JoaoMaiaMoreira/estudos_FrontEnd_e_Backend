package joao.domain.repository;

import joao.domain.entiny.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Produtos extends JpaRepository<Produto, Integer> {

}
