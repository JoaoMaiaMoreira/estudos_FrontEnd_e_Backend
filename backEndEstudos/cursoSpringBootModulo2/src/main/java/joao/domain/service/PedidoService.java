package joao.domain.service;

import joao.domain.entiny.Pedido;
import joao.domain.entiny.enums.StatusPedido;
import joao.rest.dto.PedidoDTO;

import java.util.Optional;

public interface PedidoService {
    Pedido salvar(PedidoDTO dto);

    Optional<Pedido> obterPedidoCompleto(Integer id);

    void atualizarStatus(Integer id, StatusPedido statusPedido);

}
