package joao.springBoot3.sbootexpsecurity.api;

import joao.springBoot3.sbootexpsecurity.Service.UsuarioService;
import joao.springBoot3.sbootexpsecurity.api.DTO.UsuarioDTO;
import joao.springBoot3.sbootexpsecurity.entity.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Usuario> salvar(@RequestBody UsuarioDTO usuarioDTO){
        Usuario usuarioSalvo = usuarioService.salvar(usuarioDTO.getUsuario(), usuarioDTO.getPermissoes());
        return ResponseEntity.ok(usuarioSalvo);
    }
}
