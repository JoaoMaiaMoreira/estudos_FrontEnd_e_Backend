package com.example.demo.service;

import com.example.demo.controller.TarefaDTO;
import com.example.demo.entity.TarefaEntity;
import com.example.demo.repository.TarefaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {


    private TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<TarefaEntity> findAll() {
        return tarefaRepository.findAll();
    }

    public ResponseEntity<TarefaEntity> salvar(TarefaDTO tarefaDTO){
        try{
            TarefaEntity conteudoNovoLista = new TarefaEntity();
            conteudoNovoLista.setAnotacao(tarefaDTO.getAnotacao());
            conteudoNovoLista.setRealizada(false);

            return ResponseEntity.status(HttpStatus.CREATED).body(tarefaRepository.save(conteudoNovoLista));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    public TarefaEntity tarefaRealizada(Integer id) {
       Optional<TarefaEntity> tarefaAntiga = tarefaRepository.findById(id);
       TarefaEntity tarefaAtualizada = new TarefaEntity();
       tarefaAtualizada.setRealizada(!tarefaAntiga.get().getRealizada());
       tarefaAtualizada.setId(tarefaAntiga.get().getId());
       tarefaAtualizada.setAnotacao(tarefaAntiga.get().getAnotacao());
//       BeanUtils.copyProperties(tarefaAtualizada, tarefaAntiga, "id");
       return tarefaRepository.save(tarefaAtualizada);
    }

    public ResponseEntity<String> deletarTarefa(Integer id) {
        tarefaRepository.deleteById(id);
        return ResponseEntity.ok().body("Carta deletada!");
    }

    public void deletarTudo() {
        tarefaRepository.deleteAll();
    }
}
