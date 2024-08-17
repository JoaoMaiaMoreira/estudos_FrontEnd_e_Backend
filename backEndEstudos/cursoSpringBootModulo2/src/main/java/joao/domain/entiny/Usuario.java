package joao.domain.entiny;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer id;
    @Column
    @NotEmpty(message = "Campo de login é obrigatorio" )
    private String login;
    @Column
    @NotEmpty(message = "Campo de senha é obrigatorio" )
    private String senha;
    @Column
    private boolean admin;

}
