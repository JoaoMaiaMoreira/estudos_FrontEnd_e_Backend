package joao.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InformacoesItemPedidosDTO {
    private String descricaoProduto;

    private BigDecimal precoUnitaro;
    private Integer quantidade;
}
