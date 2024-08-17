package joao.domain.service.impl.impl;

import joao.exception.SenhaInvalidaException;
import joao.domain.entiny.Usuario;
import joao.domain.repository.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.transaction.Transactional;

@Service
public class UsuarioServiceImpl implements UserDetailsService {
   @Autowired
   private PasswordEncoder encoder;

   @Autowired
   private Usuarios usuarioRepository;

   @Transactional
   @ResponseStatus(HttpStatus.CREATED)
   public Usuario salvar(Usuario usuario){
       return usuarioRepository.save(usuario);
   }

   public UserDetails autenticar(Usuario usuarioPassado){
      UserDetails usuario = loadUserByUsername(usuarioPassado.getLogin());
     boolean senhasSaoIguais = encoder.matches(usuarioPassado.getSenha(), usuario.getPassword());
        //matches é um metodo de PasswordEncoder que verifica se a senha forneciada no login é a mesma salva, PasswordEncoder criptografa as senhas com hash
        if(senhasSaoIguais){
            return usuario;
        }

        throw new SenhaInvalidaException();
   }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
           Usuario usuario = usuarioRepository.findByLogin(userName)//procura no banco o usuario pelo nome
                    .orElseThrow(()-> new UsernameNotFoundException("Usuario nao encontrado"));//se nao achar manda essa exception

           String[] roles = usuario.isAdmin() ?
                   new String[]{"ADIMIN", "USER"} : new String[]{"USER"};
           //vemos se a role do usuario é um admin, se nao for entao é user, é literal um ternario ? :

            return User
                    .builder()
                    .username(usuario.getLogin())
                    .password(usuario.getSenha())
                    .roles(roles)
                    .build();
            //retornamos um user

        //Feito sem class usuario
        //        if(!userName.equals("caboco")){
//            throw new UsernameNotFoundException("Usuario não encontrado");
//        }
//
//        return User
//                .builder()
//                .username("caboco")
//                .password(encoder.encode("123"))
//                .roles("USER", "ADMIN")
//                .build();
 }
}
