package joao.rest.controller;

import joao.domain.entiny.Usuario;
import joao.domain.service.impl.impl.UsuarioServiceImpl;
import joao.exception.SenhaInvalidaException;
import joao.rest.dto.CredenciaisDTO;
import joao.rest.dto.TokenDTO;
import joao.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioServiceImpl usuarioService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario salvar(@Valid @RequestBody Usuario usuario){
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);
        return usuarioService.salvar(usuario);
    }

    @PostMapping("/auth")
    public TokenDTO autentificar(@RequestBody CredenciaisDTO credenciaisDTO){
        try{
           Usuario usuario = Usuario
                    .builder()
                    .login(credenciaisDTO.getLogin())
                    .senha(credenciaisDTO.getSenha())
                    .build();
           UserDetails usuarioAutentificado = usuarioService.autenticar(usuario);
          String token = jwtService.gerarToken(usuario);
          return new TokenDTO(usuario.getLogin(), token);

        }catch (UsernameNotFoundException |SenhaInvalidaException e ){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }
//        catch (SenhaInvalidaException e){
//        }
    }

}
