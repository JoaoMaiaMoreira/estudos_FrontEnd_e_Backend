package joao.springBoot3.sbootexpsecurity.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@NoArgsConstructor
public class IdentificacaoUsuario {
//todo usuario vai ter que ter essa identificacao, aqui é aonde vamos poder  colocar todas as propriedades necessarias para identificar o usuario
    //para integrar com o spring security é nescessario criar um objeto do tipo authentication
    //personalizada, igual explicado antes tem como criar authentication personalizadas
    private String id;
    private String nome;
    private String login;
    private List<String> permissoes;

    public IdentificacaoUsuario(String id, String nome, String login, List<String> permissoes) {
        this.id = id;
        this.nome = nome;
        this.login = login;
        this.permissoes = permissoes;
    }

    public List<String> getPermissoes() {
       if(permissoes == null){
           permissoes = new ArrayList<>();
       }

       //boa pratica quando dar get permissoes, se permissoes estiver vazio retorna uma lista vazia

        return permissoes;
    }
}
