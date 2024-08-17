package yugiohProjetoComSecurity.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import yugiohProjetoComSecurity.demo.entiny.UsuarioRoles;

public record LogarDTO(String email, String senha, UsuarioRoles role) {
}
