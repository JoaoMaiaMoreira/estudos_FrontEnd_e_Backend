package yugiohProjetoComSecurity.demo.entiny;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name = "carta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull()
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String tipo;
    @Column(nullable = false)
    private String atributo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Integer nivel;

    @Column(nullable = false)
    private Integer atk;
    @Column(nullable = false)
    private Integer def;
}
