package joao.springBoot3.sbootexpsecurity.api;

import org.apache.catalina.Authenticator;
import org.apache.catalina.connector.Response;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.boot.autoconfigure.pulsar.PulsarProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class FullController {
    @GetMapping("/publico")
    public ResponseEntity<String> retornoRandolaPublico(){
        return ResponseEntity.ok("Retorno publico, tá ok");
    }
    //Authentication
    //getCredentials retorna (objet) a senha da authentication, retorna a senha de quem quer se autheticar
    //getDetails, dados de onde veio, que horas logou na ultima vez
    //getPrincipal, sao a identificacao de quem esta acessando, de quem pertence essa authentication, nome, email
    //O bom mesmo é criar um objeto que implementa a interface authentication para extrair melhor od dados do usuario
   //nao precisa de @Autori... pois esta dentro de um parametro de uma rato portanto injeta sozinho


    @GetMapping("/privado")
    public ResponseEntity<String> retornoRanodlaPrivado(Authentication authentication){
        return ResponseEntity.ok("Retorno privado, tá ok. Usuario:" + authentication.getName()); //GetName é do Principal que é extendido
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')") //para fazer a authorization aqui
    public ResponseEntity<String> admRota(Authentication authentication){
        return ResponseEntity.ok("Vida de adm não é facil");
    }

}
