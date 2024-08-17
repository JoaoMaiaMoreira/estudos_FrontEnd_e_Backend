package joao.domain.entiny;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Entity
@Table(name = "cliente" )
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
//Colun e Table so é obrigatorio caso o nome seja diferente do nome da tabela ou coluna do banco, se for igual ele ja identifica sozinho
    @Column(name = "nome", length = 100)
    @NotEmpty(message = "campo nome é obrigatorio")
    private String nome;

    @Column(name = "cpf", length = 11)
    @NotEmpty(message = "campo cpf é obrigatorio")
    @CPF(message = "informe um cpf valido")
    private String cpf;

    @JsonIgnore
    @OneToMany(mappedBy = "cliente")
    private Set<Pedido> pedidos;

    public Cliente(){

    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public void setPedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
    }

    public Cliente(String nome) {
        this.nome = nome;
    }

    public Cliente(Integer id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                ", pedidos=" + pedidos +
                '}';
    }
}
