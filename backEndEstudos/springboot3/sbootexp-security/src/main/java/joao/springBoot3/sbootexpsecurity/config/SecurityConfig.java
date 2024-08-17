package joao.springBoot3.sbootexpsecurity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

//quando cria um filtro o security ja substitui a configuracao padrao
//role -> grupo de usuario (perfil de usuario) -> Master, gerente, vendedor
//authority -> permissoes -> cadastrar usuario, acessar tela de relatorio

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true) //para pode cofgigurar as authorization nas controller
//nao precisa mais do WebSecurityExtendsAdapter
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   SenhaMasterAuthenticationProvider senhaMasterAuthenticationProvider,
                                                   CustomAuthenticationProvider customAuthenticationProvider, //a custom authentication provider que a gente criou
                                                   CustomFilter customFilter) throws Exception{
        //autentificacao -> identidade de quem esta acessando a api, Autorizacaco -> oq X pode acessar na api
        return http
                .csrf(AbstractHttpConfigurer::disable)//esse filtro é quanod esta com aplicacao web, no nosso cass a gente esta so com api, para proteger de hackers com tokens
                .authorizeHttpRequests(customizer -> {
                    //quando fazer uma requisicao para a rota "/publico" vai permitir tudo
                    customizer.requestMatchers("/publico").permitAll();
//                    customizer.requestMatchers("/admin").hasRole("ADMIN"); vamos passar na propria controller para nao ficar uma bagunca aqui

                   //qualquer outra requisicao tem que estar autenticado, anyRequeste so pode ser chamado por ultimo
                    customizer.anyRequest().authenticated();
        })
                .httpBasic(Customizer.withDefaults())// aqui funciona da seguinte forma "tenho um header authorization com inicio basic? se sim entra na configuracao de authentificacao basic
                //cria um customize com tudo padrao, assim ja configura o Basic
                .formLogin(Customizer.withDefaults())//caso nao te basic entra no filtro de formulario
                //com formulario login
                .authenticationProvider(senhaMasterAuthenticationProvider)//pode colocar quantos authentication provider você quiser, depende da situacao e da sua logica
                .authenticationProvider(customAuthenticationProvider)//A ordem importa! Se ja tiver com a authentication da senhaMaster, nao vai entrar nessa, se nao tiver nenhuma ele cai no filto
                .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class)//outra maneira de authenticar  usuario, existe before e ater pois pode decidir em qual momento iremos adicionalo, custom filter vai ser acionado depois do que esta em sua frente
                .build();
    }

    //UserDatails interface que pode ser utilizada para carregar usuario de alguma base
    @Bean
    public UserDetailsService userDetailsService(){
        UserDetails usuarioComum = User.builder()
                .username("user")
                //chamamos nosso metodo e o .encoder para cryptografar a senha, e na hora que useDatais servie for receber usuarios ele vai coparar a senha que foi digitada e a que foi salva
                .password(passwordEncoder().encode("123"))
                .roles("USER") // perfil de usuario
                .build();

        UserDetails usuarioAdm = User.builder()
                .username("adm")
                .password(passwordEncoder().encode("123"))
                .roles("ADMIN") // perfil de usuario
                .build();


        return new InMemoryUserDetailsManager(usuarioComum, usuarioAdm);
    }

    //
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //editar o "ROLE_" que era 'obrigatorio'
    @Bean
    public GrantedAuthorityDefaults grantedAuthorityDefaults(){
        return new GrantedAuthorityDefaults("");
    }

}
