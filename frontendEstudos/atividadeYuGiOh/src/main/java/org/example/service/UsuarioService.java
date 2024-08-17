package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.LogarDTO;
import org.example.dto.UsuarioDTO;
import org.example.entiny.Usuario;
import org.example.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    private final UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario cadastrar(UsuarioDTO usuarioDTO){

            Usuario novoUsuario = new Usuario();
            novoUsuario.setNome(usuarioDTO.getNome());
            novoUsuario.setEmail(usuarioDTO.getEmail());
            novoUsuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
            return usuarioRepository.save(novoUsuario) ;
    }

    public UserDetails logar(LogarDTO logarDTO) throws Exception {
        UserDetails usuario = loadUserByUsername(logarDTO.getEmail());
        boolean senhasIguais = passwordEncoder.matches(logarDTO.getSenha(), usuario.getPassword());
        if(senhasIguais){
            return usuario;
        }

        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        return User
                .builder()
                .username(usuario.get().getEmail())
                .password(usuario.get().getSenha())
                .build();
        //oq precisa ser feito vamos buscar um usuario pelo email dele, depois setamos esse usuario e comparamos a senha que etsa no banco com a senha digitada
    }


}
