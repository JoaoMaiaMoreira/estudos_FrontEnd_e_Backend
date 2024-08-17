package joao.config;

import joao.domain.service.impl.impl.UsuarioServiceImpl;
import joao.security.jwt.JwtAuthFilter;
import joao.security.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UsuarioServiceImpl usuarioService;
    @Autowired
    private JwtService jwtService;

    //autentficar usuario, precisa de um passwordEncoder, class
    @Bean
   public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
   }

   @Bean
   public OncePerRequestFilter jwtFilter(){
        return new JwtAuthFilter(jwtService, usuarioService);
   }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //ele que faz a autentificação do usuario e adiciona ele dentro do contexto do security
//usuario em memoria ->
        //        auth.inMemoryAuthentication().passwordEncoder(passwordEncoder()).withUser("Joao").password(passwordEncoder().encode("Carlinhos")).roles("USER");
    auth.
        userDetailsService(usuarioService)
        .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers("/api/clientes/**")
                        .hasAnyRole("USER", "ADMIN")
                    .antMatchers("api/produtos/**")
                        .hasAnyRole("ADMIN")
                    .antMatchers("/api/pedidos/**")
                        .hasAnyRole("USER", "ADMIN")
                    .antMatchers(HttpMethod.POST, "/api/usuarios/**")
                        .permitAll()
                    .anyRequest().authenticated()
                .and()
                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
                //agora toda requisicao tem que passar o token
                    //passa por header, sem o formLogin()
        //defie url e diz quem pode acessar essa url, .permitAll diz que qualquer um pode acessar
    }

    //Role é tipo perfies de usuario
    @Override
    public void configure(WebSecurity web) throws Exception{
        web.ignoring().antMatchers(
                "/v2/api/docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**");
    }

}
