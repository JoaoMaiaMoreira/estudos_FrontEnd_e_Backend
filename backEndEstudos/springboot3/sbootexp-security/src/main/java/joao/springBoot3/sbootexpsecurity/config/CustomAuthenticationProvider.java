package joao.springBoot3.sbootexpsecurity.config;

import joao.springBoot3.sbootexpsecurity.Service.UsuarioService;
import joao.springBoot3.sbootexpsecurity.entity.Usuario;
import joao.springBoot3.sbootexpsecurity.security.CustomAuthentication;
import joao.springBoot3.sbootexpsecurity.security.IdentificacaoUsuario;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

   private final UsuarioService usuarioService; //para obviamente poder obter o usuario e acessar a logica
   private final PasswordEncoder passwordEncoder; //para verificar tografadase a atual senha esta batendo com a senha crip

    @Override    //                esse athentication é do metodo abaixo
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String login = authentication.getName();
        String senha = (String) authentication.getCredentials();
        //agora vamos buscar um usuario pelo nome para buscar se a senha esta batento

        Usuario usuario = usuarioService.obterUsuarioComPermissoes(login);
        if(usuario != null){
            boolean senhaIguais = passwordEncoder.matches(senha, usuario.getSenha());//ver se a senha digitada esta igual a senha criptografada
            if(senhaIguais){
                IdentificacaoUsuario identificacaoUsuario = new IdentificacaoUsuario(usuario.getId(), usuario.getNome(), usuario.getLogin(), usuario.getPermissoes());
                return new CustomAuthentication(identificacaoUsuario);
            }

        }

        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        //return true; //se for false nem entre la em cima, pois ele quer saber se minha authenticate para entrar aqui aceita essa class que vem, geralmente vem UserNamePasswordAuthenticationToken
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
        //mas se estiver usando outra authentificacao tem que mudar
    }
}

//ja estamos provendo uma athentication em baseado nos usuarios cadastrados na tabela usuario, ja esta implementado agora so precisa registra na configuracao
// em security config