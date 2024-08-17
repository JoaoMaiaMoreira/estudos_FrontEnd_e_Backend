package yugiohProjetoComSecurity.demo.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yugiohProjetoComSecurity.demo.dto.LogarDTO;
import yugiohProjetoComSecurity.demo.dto.UsuarioDTO;
import yugiohProjetoComSecurity.demo.service.UsuarioService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/logar")
    public ResponseEntity<String> logar(@RequestBody @Valid LogarDTO logarDTO){
       return usuarioService.logar(logarDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario logado!");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody @Valid UsuarioDTO usuarioDTO ){
        return usuarioService.cadastrar(usuarioDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario cadastrado");
    }
}
