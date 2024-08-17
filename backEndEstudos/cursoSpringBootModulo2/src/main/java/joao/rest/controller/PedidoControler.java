package joao.rest.controller;

import joao.domain.entiny.ItemPedido;
import joao.domain.entiny.Pedido;
import joao.domain.entiny.enums.StatusPedido;
import joao.domain.service.PedidoService;
import joao.rest.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoControler {
    private PedidoService service;

    public PedidoControler(PedidoService service){
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Integer save(@Valid @RequestBody PedidoDTO dto){
       Pedido pedido = service.salvar(dto);
       return pedido.getId();
    }

    @GetMapping("{id}")
    public InformacoesPedidosDTO getById(@PathVariable Integer id){
    return service.obterPedidoCompleto(id).map(p -> {
        return converter(p);
    }).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,  "Pedido nao encontrado"));
    }

//    @PutMapping
    //quando quer atualizar so um pedaco na entidady usa o path
  @PatchMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void mudarStatus(@PathVariable Integer id, @RequestBody AtualizacaoStatusDTO dto){
        String novoStatus = dto.getNovosStatus();
        service.atualizarStatus(id, StatusPedido.valueOf(novoStatus));
    }

    private InformacoesPedidosDTO converter(Pedido pedido){
      return  InformacoesPedidosDTO
              .builder()
              .codigo(pedido.getId())
              .dataPedido(pedido.getDataPedido().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
              .cpf(pedido.getCliente().getCpf())
              .nomeCliente(pedido.getCliente().getNome())
              .total(pedido.getTotalPedido())
              .status(pedido.getStatusPedido().name())
              .items(converter(pedido.getItems()))
              .build();
    }

    private List<InformacoesItemPedidosDTO> converter(List<ItemPedido> item){
        if(CollectionUtils.isEmpty(item)){
            return Collections.emptyList();
        }

        return item.stream().map(i -> InformacoesItemPedidosDTO.builder().descricaoProduto(i.getProduto().getDescricao()).quantidade(i.getQuantidade()).build()
        ).collect(Collectors.toList());
    }

}
