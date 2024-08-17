package yugiohProjetoComSecurity.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import yugiohProjetoComSecurity.demo.repository.UsuarioRepository;

//chamado automaticamente sempre que um usuario for se authenticar
//antes estava em usuario service
@Service
@RequiredArgsConstructor
public class AuthorizationService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username);
    }
}
