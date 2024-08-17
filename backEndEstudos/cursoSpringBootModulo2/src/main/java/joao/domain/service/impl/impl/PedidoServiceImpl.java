package joao.domain.service.impl.impl;

import joao.exception.PedidoNaoEncontradoExeception;
import joao.domain.entiny.Cliente;
import joao.domain.entiny.ItemPedido;
import joao.domain.entiny.Pedido;
import joao.domain.entiny.Produto;
import joao.domain.entiny.enums.StatusPedido;
import joao.domain.repository.Clientes;
import joao.domain.repository.ItemsPedidos;
import joao.domain.repository.Pedidos;
import joao.domain.repository.Produtos;
import joao.domain.service.PedidoService;
import joao.exception.RegraNegocioException;
import joao.rest.dto.ItemPedidoDTO;
import joao.rest.dto.PedidoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
//Gera um construtor com os argumentos obrigatorio aqules que tem final
public class PedidoServiceImpl implements PedidoService {

    private final Pedidos pedidosRepository;
    private final Clientes clientesRepository;
    private final Produtos produtosRepository;
    private final ItemsPedidos itemsPedidosRepository;

//    public PedidoServiceImpl(Pedidos repository, Clientes clientes){
//        this.repository = repository;
//        this.clientesRepository = clientes;
//    }
    //Usando o lookbok

    @Override
    @Transactional
    public Pedido salvar(PedidoDTO dto) {
        Integer idCliente = dto.getCliente();
        Cliente cliente = clientesRepository.findById(idCliente)
               .orElseThrow(()-> new RegraNegocioException("Codigo de cliente invalido"));
        Pedido pedido = new Pedido();
        pedido.setTotalPedido(dto.getTotal());
        pedido.setDataPedido(LocalDate.now());
        pedido.setCliente(cliente);
        pedido.setStatusPedido(StatusPedido.REALIZADO);

        List<ItemPedido> itemPedido = converterItem(pedido, dto.getItems());
        pedidosRepository.save(pedido);
        itemsPedidosRepository.saveAll(itemPedido);
        pedido.setItems(itemPedido);
        return pedido;
    }

    @Override
    public Optional<Pedido> obterPedidoCompleto(Integer id) {
        return  pedidosRepository.findByIdFetchItens(id);
    }

    @Override
    @Transactional
    public void atualizarStatus(Integer id, StatusPedido statusPedido) {
        pedidosRepository.findById(id).map(pedido->{
            pedido.setStatusPedido(statusPedido);
            return pedidosRepository.save(pedido);
        }).orElseThrow(()-> new PedidoNaoEncontradoExeception());

    }

    private List<ItemPedido> converterItem(Pedido pedido, List<ItemPedidoDTO> items){
        if(items.isEmpty()){
            throw new RegraNegocioException("Nao tem itens em seu pedido");
        };

        return items.stream().map(dto -> {
            Integer idProduto = dto.getProduto();
            Produto produto = produtosRepository.findById(idProduto).orElseThrow(() -> new RegraNegocioException("codigo de produto invalido"));

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setQuantidade(dto.getQuantidade());
            itemPedido.setPedido(pedido);
            itemPedido.setProduto(produto);
            return itemPedido;
        }).collect(Collectors.toList());
    }

}
