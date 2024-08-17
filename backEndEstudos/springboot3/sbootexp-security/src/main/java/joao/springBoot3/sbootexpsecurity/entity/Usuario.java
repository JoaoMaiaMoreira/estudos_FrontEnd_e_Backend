package joao.springBoot3.sbootexpsecurity.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String login;
    private String senha;
    private String nome;

    @Transient //if=gnora o mapeamento JPA
    private List<String> permissoes;
}
