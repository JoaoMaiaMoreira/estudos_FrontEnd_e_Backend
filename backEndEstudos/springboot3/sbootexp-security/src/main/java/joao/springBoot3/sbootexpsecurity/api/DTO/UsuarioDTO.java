package joao.springBoot3.sbootexpsecurity.api.DTO;

import joao.springBoot3.sbootexpsecurity.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Usuario usuario;
    private List<String> permissoes;
}
