package joao.security.jwt;

import joao.domain.service.impl.impl.UsuarioServiceImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthFilter extends OncePerRequestFilter {
    //filtro do spring
    private JwtService jwtService;
    private UsuarioServiceImpl usuarioService;

    public JwtAuthFilter(JwtService jwtService, UsuarioServiceImpl usuarioService) {
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String authorization = httpServletRequest.getHeader("Authorization");
        //getHeader() pega o header que foi passado nos () da requisicao que estaa sendo processada, queremos o authorization para pegar o token
        if(authorization != null && authorization.startsWith("Bearer")){
           //se nao for nulo, (o token jwt é um Bearer token) e comeca com "Bearer", mas o BEarer é a gente que escreve
            String token = authorization.split(" ")[1];
            //pegar o token, split corta o espaco e pegamos o index 1
            boolean isValid = jwtService.tokenValido(token);
            if(isValid){
                String loginUsuario = jwtService.obterUsuario(token);//obtem o login do usuario passando o token
                UserDetails usuario = usuarioService.loadUserByUsername(loginUsuario); //obtem o usuario passando o login do usuario
                UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                user.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest)); //é nessesario para dizer para o spring que é uma aplicacao web
                SecurityContextHolder.getContext().setAuthentication(user);
                //assim jogamos o usuario para o contexto de aplicacao
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse );

    }
}
