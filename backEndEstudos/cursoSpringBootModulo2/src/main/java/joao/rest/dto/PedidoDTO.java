package joao.rest.dto;
//{
//    "cliente": 1,
//    "total": 100,
//    "items": [
//        {
//            "produto" : 1,
//            "quantidade": 10
//        }
//            ]
//}

import joao.validatior.NotEmptyList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO {
    //com o resources
    @NotNull(message = "{campo.codigo-cliente.obrigatorio}")
    private Integer cliente;
    @NotNull(message = "Total obrigatorio")
    private BigDecimal total;
    @NotEmptyList(message = "Pedido nao pode ser realizado sem itens")
    private List<ItemPedidoDTO> items;



}
