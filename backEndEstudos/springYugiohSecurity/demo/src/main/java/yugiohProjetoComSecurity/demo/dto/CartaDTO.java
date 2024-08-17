package yugiohProjetoComSecurity.demo.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;


@Data
public class CartaDTO {

    @NotNull
    private String nome;
    private Integer atk;
    private Integer def;
    private Integer nivel;
    private String tipo;
    private String atributo;
    private String descricao;
}
