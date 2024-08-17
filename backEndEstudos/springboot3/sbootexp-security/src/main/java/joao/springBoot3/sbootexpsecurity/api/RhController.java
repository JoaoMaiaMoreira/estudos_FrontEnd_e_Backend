package joao.springBoot3.sbootexpsecurity.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rh")
public class RhController {

    @GetMapping("/tecnico")
    @PreAuthorize("hasRole('TECNICO_RH')")
    public ResponseEntity<String> tecnico(){
        return ResponseEntity.ok("Rota dos tecnico, (adm tambem poderia acessar)");
    }

    @GetMapping("/gerente")
    @PreAuthorize("hasAnyRole('GERENTE_RH', 'ADMIN')")
    public ResponseEntity<String> gerente(){
        return  ResponseEntity.ok("Rota do Gerente, adm tambem acessa");
    }

}
