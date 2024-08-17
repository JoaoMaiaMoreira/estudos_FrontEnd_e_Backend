package joao.domain.entiny;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;


@Data
@NoArgsConstructor //Faz construtor se argummentos
@AllArgsConstructor //Faz Construtor com todos os argumentos
//Loombok!! @Getter ja faz todos os getters @Setter a mesma coisa!! @Data é compilado de comandos
//Porem ele so faz os getter e setter padrao que é aquele this.resposta = resposta
@Entity
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "preco_unitario")
    private BigDecimal preco;
}
