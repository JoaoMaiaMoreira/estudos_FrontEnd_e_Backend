package yugiohProjetoComSecurity.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yugiohProjetoComSecurity.demo.controller.exeptions.TaErradoIssoAi;
import yugiohProjetoComSecurity.demo.dto.CartaDTO;
import yugiohProjetoComSecurity.demo.entiny.Carta;
import yugiohProjetoComSecurity.demo.repository.CartasRepository;

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
                 ()-> new TaErradoIssoAi("Id nao encontrado" + id)
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
