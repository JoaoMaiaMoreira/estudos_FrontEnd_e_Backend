package org.example.Config;

import org.example.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.OncePerRequestFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UsuarioService usuarioService;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(); //biblioteca para codifica a senha
    }
//
//    @Bean
//    public OncePerRequestFilter jwt(){
//
//    }
    //filtro  que sera realizado tda vez que uma requisicao ser chamada

    @Override
    protected void configure(AuthenticationManagerBuilder autorizacao) throws Exception{
        autorizacao.
                userDetailsService(usuarioService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/usuario/cadastro")
                    .permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin();

    }


}
