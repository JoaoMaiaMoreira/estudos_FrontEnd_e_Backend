package joao.springBoot3.sbootexpsecurity.api;

import jakarta.transaction.Transactional;
import joao.springBoot3.sbootexpsecurity.Service.GrupoSevice;
import joao.springBoot3.sbootexpsecurity.entity.Grupo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grupos")
@RequiredArgsConstructor
public class GrupoController {
    private final GrupoSevice grupoSevice;

    @PostMapping
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public Grupo salvar(@RequestBody Grupo grupo){
        Grupo g = grupoSevice.save(grupo);
        return ResponseEntity.ok(g).getBody();
    }

    @GetMapping("pegar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Grupo>> lista(){
        return ResponseEntity.ok(grupoSevice.findAll());
    }

}
