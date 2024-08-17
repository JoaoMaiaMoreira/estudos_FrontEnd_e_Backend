package yugiohProjetoComSecurity.demo.service;

import com.sun.jdi.InternalException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import yugiohProjetoComSecurity.demo.controller.exeptions.TaErradoIssoAi;
import yugiohProjetoComSecurity.demo.dto.LogarDTO;
import yugiohProjetoComSecurity.demo.dto.TokenDTO;
import yugiohProjetoComSecurity.demo.dto.UsuarioDTO;
import yugiohProjetoComSecurity.demo.entiny.Usuario;
import yugiohProjetoComSecurity.demo.entiny.UsuarioRoles;
import yugiohProjetoComSecurity.demo.repository.UsuarioRepository;
import yugiohProjetoComSecurity.demo.security.Config.TokenService;

@Service
@RequiredArgsConstructor
public class UsuarioService{

//    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final AuthorizationService authorizationService;

    private final UsuarioRepository usuarioRepository;

    private final TokenService tokenService;

   @Transactional
   public ResponseEntity<String> cadastrar(UsuarioDTO usuarioDTO){
       if(!usuarioDTO.getEmail().contains("@") && !usuarioDTO.getEmail().contains("com")){
           throw new TaErradoIssoAi("Email invalido");
       }

       if(!usuarioDTO.getSenha().matches("(?=.*\\d)(?=.*[a-zA-Z])[\\d\\w]{8,}$")){
           throw new TaErradoIssoAi("Digite uma senha forte");
       }

       //nao tem porque eu pegar o email por id, e comparar o resultado com usuarioDtO se achra ignifica que ja tem um la
       if(usuarioRepository.findByEmail(usuarioDTO.getEmail()) != null){
           throw new TaErradoIssoAi("Usuario já cadastrado");
       }

       String encode = new BCryptPasswordEncoder().encode(usuarioDTO.getSenha());

       Usuario usuario = new Usuario(usuarioDTO.getNome(), usuarioDTO.getEmail(), encode, UsuarioRoles.USER);

       try {
           usuarioRepository.save(usuario);
           return ResponseEntity.ok().body("Usuario Cadastrado");
       } catch (InternalException ie) {
           throw new TaErradoIssoAi("Nao é possivel cadastrar usuario");
       }
   }

    @Transactional
    public ResponseEntity logar(LogarDTO logarDTO){

//       if(usuarioRepository.findByEmail(logarDTO.email()) == null){
//           throw new TaErradoIssoAi("O email não cadastrado");
//       }
       try{
           var loginESenhaCriptografada = new UsernamePasswordAuthenticationToken(logarDTO.email(), logarDTO.senha()); //login e senha do usuario junto
           Authentication auth = this.authenticationManager.authenticate(loginESenhaCriptografada);
           try {
               String token = tokenService.generateToken((Usuario) auth.getPrincipal());
               return ResponseEntity.ok(new TokenDTO(token));
           }catch (Exception e){
               throw new TaErradoIssoAi("Erro ao gerar token");
           }

       }catch(Exception e){
           throw new TaErradoIssoAi("Email não cadastrado ou senha incorreta");
       }
    }

    //
//            Usuario novoUsuario = new Usuario();
//            novoUsuario.setNome(usuarioDTO.getNome());
//            novoUsuario.setEmail(usuarioDTO.getEmail());
//            novoUsuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
    //    return usuarioRepository.save(novoUsuario) ;


//    public UserDetails logar(LogarDTO logarDTO) throws Exception {
//        UserDetails usuario = authorizationService.loadUserByUsername(logarDTO.getEmail());
//        boolean senhasIguais = passwordEncoder.matches(logarDTO.getSenha(), usuario.getPassword());
//        if(senhasIguais){
//            return usuario;
//        }
//
//        return null;
//    }

//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
//
//        return User
//                .builder()
//                .username(usuario.get().getEmail())
//                .password(usuario.get().getSenha())
//                .build();
//        //oq precisa ser feito vamos buscar um usuario pelo email dele, depois setamos esse usuario e comparamos a senha que etsa no banco com a senha digitada
//    }


}
