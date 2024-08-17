package yugiohProjetoComSecurity.demo.entiny;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity(name = "usuario")
@Table(name = "usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Usuario implements UserDetails {
    //UserDetails usava para idetificar class de um usuario que vai ser implementado na aplicacao
    //NotNull -> nao aceita null, mas aceita vazio " "
    //NotEmpty -> nao pode ser null e aceita somente com o tamanho > 0 (CharSequence , Collection , Map ou Array)
    //NotBlank -> nao deve ser nulo e o comprimento deve ser maior que > 0

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column
    private String nome;

    @Column
    private String email;

    @Column
    private String senha;

    @Column
    @Enumerated(EnumType.STRING) //para quando for enum typo string, tem que ter essa @ se nao da erro no banco
    private UsuarioRoles role;

    public Usuario(String nome, String email, String senha, UsuarioRoles role) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        if(this.role == UsuarioRoles.ADMIN) return  List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return senha;
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
