package joao.springBoot3.sbootexpsecurity.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import joao.springBoot3.sbootexpsecurity.security.CustomAuthentication;
import joao.springBoot3.sbootexpsecurity.security.IdentificacaoUsuario;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
//filtro que vai ser relizado uma vezzz por requisicao
public class CustomFilter extends OncePerRequestFilter {

    //esse filtro interfecepta toda requisicao
    @Override
    protected void doFilterInternal(HttpServletRequest request, //dados da requisicao
                                    HttpServletResponse response,//resposta, caso queira mudar
                                    FilterChain filterChain) throws ServletException, IOException  { //objeto que faz o intermedio de todos filter cham

       String secretHeader = request.getHeader("x-secret");

       if(secretHeader != null){

          if( secretHeader.equals("secr3t")){
              var identificacaoUsuario = new IdentificacaoUsuario(
                      "id-secret",
                      "Muito-secreto",
                      "x-secret",
                      List.of("User")
              );
//              Authentication authentication = new UsernamePasswordAuthenticationToken("Secreto", null, List.of(new SimpleGrantedAuthority("USER")) );
             Authentication authentication = new CustomAuthentication(identificacaoUsuario);
             //agora usamos o o mesmo objeto de autenticacao para tudo no nosso sistema

              SecurityContext securityContext = SecurityContextHolder.getContext();
              securityContext.setAuthentication(authentication);
          }

       }

       filterChain.doFilter(request, response);

       //interceptamos a requisicao, vemos se existe o cabecalho, se existe vemos existe aquela senha, se existir cria um objeto authentication e adiona dentro do contexto do spring
    }
}
