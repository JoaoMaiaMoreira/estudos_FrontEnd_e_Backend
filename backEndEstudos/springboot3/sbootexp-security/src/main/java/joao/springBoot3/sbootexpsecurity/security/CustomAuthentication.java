package joao.springBoot3.sbootexpsecurity.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
//precisamos cirar uma uatentication provider para ler da nossabase de usuario criar o customAuthentication (esse)
//vai prover durante o fluxo da aplicacao
//precisa prover uma authentication para o usuarrio esteja logado

public class CustomAuthentication implements Authentication {

    private final IdentificacaoUsuario identificacaoUsuario;

    public CustomAuthentication(IdentificacaoUsuario identificacaoUsuario) {
        if(identificacaoUsuario == null){
            throw new ExceptionInInitializerError("Nao é possivel criar a customauthentication, sem a identificacao do usuario");
        }
        this.identificacaoUsuario = identificacaoUsuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.identificacaoUsuario
                .getPermissoes()
                .stream()//vai estar vazio ou com algo
                .map(permissao -> new SimpleGrantedAuthority(permissao))
                .collect(Collectors.toList());
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return this.identificacaoUsuario; //retorna a identificacao do usario
    }

    @Override
    public boolean isAuthenticated() {
        return true; //muda para true, pois se for false o spring ai entender que nao esta autenticado
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
//nao precisa de nada
        throw new IllegalArgumentException("ja esta autenticado");
    }

    @Override
    public String getName() {
        return this.identificacaoUsuario.getNome(); //Retornar o nome da identificacao
    }
}
