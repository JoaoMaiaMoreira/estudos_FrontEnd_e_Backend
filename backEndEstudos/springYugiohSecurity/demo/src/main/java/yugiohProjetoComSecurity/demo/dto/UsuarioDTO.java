package yugiohProjetoComSecurity.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import yugiohProjetoComSecurity.demo.entiny.UsuarioRoles;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    @NotBlank
    private String nome;
    @NotBlank
    private String email;
    @NotBlank
    private String senha;

}
