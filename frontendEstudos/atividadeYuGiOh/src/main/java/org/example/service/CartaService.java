package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.CartaDTO;
import org.example.dto.CartaNomeEDescricaoDTO;
import org.example.entiny.Carta;
import org.example.repository.CartasRepository;
import org.example.service.exeptions.EntityNaoEncontrada;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CartaService {

    private final CartasRepository cartasRepository;

    public boolean existsByNome(String nome) {
        return cartasRepository.existsByNome(nome);
    }

    @Transactional
    public Carta save(Carta carta) {
        return cartasRepository.save(carta);
    }

    public List<Carta> findByAll() {
        return cartasRepository.findAll();
    }

    public void deletar(Integer id){
        cartasRepository.deleteById(id);
    }

    public Carta buscarPorId(Integer id){
         return cartasRepository.findById(id).orElseThrow(
                 ()-> new EntityNaoEncontrada("Id nao encontrado" + id)
         );
    }

    public void salvar(CartaDTO dto) {
        if(cartasRepository.existsByNome(dto.getNome())){
            return;
        }
        Carta carta = new Carta();
        carta.setNome(dto.getNome());
        carta.setAtk(dto.getAtk());
        carta.setDef(dto.getDef());
        carta.setNivel(dto.getNivel());
        carta.setAtributo(dto.getAtributo());
        carta.setDescricao(dto.getDescricao());
        carta.setTipo(dto.getTipo());
        cartasRepository.save(carta);
    }

    public List<Carta> buscarPorNome(String nome){
        return cartasRepository.findByNome(nome);
    }

//    public List<CartaNomeEDescricaoDTO> findByNomeAndDescricao(){
//        List<CartaNomeEDescricaoDTO> cartaNomeEDescricaoDTO = (List<CartaNomeEDescricaoDTO>) new CartaNomeEDescricaoDTO();
//        List<Carta> = cartasRepository.findAll();
//
//    }

}
