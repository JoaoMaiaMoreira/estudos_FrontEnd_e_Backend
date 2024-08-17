package joao.springBoot3.sbootexpsecurity.config;

import joao.springBoot3.sbootexpsecurity.security.CustomAuthentication;
import joao.springBoot3.sbootexpsecurity.security.IdentificacaoUsuario;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

//AuthenticationProvider visa criar/prove uma Authentication

@Component
public class SenhaMasterAuthenticationProvider implements AuthenticationProvider{

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        var login = authentication.getName();
        var senha = (String) authentication.getCredentials();
        //essa login e essa vem da basic ou da form login
        String loginMaster = "master";
        String senhaMAster = "@321";

        if(loginMaster.equals(login) && senhaMAster.equals(senha)){
            IdentificacaoUsuario identificacaoUsuario = new IdentificacaoUsuario
                    ("Sou master", "Master", loginMaster, List.of("ADMIN"));
//            return new UsernamePasswordAuthenticationToken("Sou master", null, List.of(new SimpleGrantedAuthority("ADMIN"))); //tem que ter "ROLE_", ou edita em um Bean la em SecurtyConfig
            return new CustomAuthentication(identificacaoUsuario); //indeendente do tipo de Authenticacao das autenticacoes que serao adicionadas, tudo vai se  transformar no final nessa custom
            //Mesma coisa sera feita no customFilter
        }

        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
