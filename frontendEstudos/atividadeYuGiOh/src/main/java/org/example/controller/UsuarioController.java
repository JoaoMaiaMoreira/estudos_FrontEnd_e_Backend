package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.dto.UsuarioDTO;
import org.example.dto.LogarDTO;
import org.example.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@RequestBody UsuarioDTO usuarioDto){
        usuarioService.cadastrar(usuarioDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario adicionado!");
    }

    @PostMapping("/logar")
    public ResponseEntity<String> logar(@RequestBody LogarDTO logarDTO) throws Exception {
        usuarioService.logar(logarDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario logado");
    }
}
