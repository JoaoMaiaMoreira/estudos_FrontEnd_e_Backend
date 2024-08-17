package com.example.demo.controller;

import com.example.demo.entity.TarefaEntity;
import com.example.demo.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/listaTarefas")
public class TarefaController {
    @Autowired
    private TarefaService tarefaService;

    @GetMapping
    public List<TarefaEntity> buscarTodaLista(){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(tarefaService.findAll()).getBody();
    }

    @PostMapping("/add")
    public ResponseEntity<TarefaEntity> adicionarNaLista(@RequestBody TarefaDTO tarefaDto){
        return tarefaService.salvar(tarefaDto);
    }

    @PutMapping("/realizada/{id}")
    public TarefaEntity tarefaConcluida(@PathVariable Integer id){
        return tarefaService.tarefaRealizada(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> apagarTarefa(@PathVariable Integer id) {
        return tarefaService.deletarTarefa(id);
    }

    @DeleteMapping("/deletarTudo")
    public void apagarTodasTarefas(){
        tarefaService.deletarTudo();
    }


}
