package yugiohProjetoComSecurity.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yugiohProjetoComSecurity.demo.dto.CartaDTO;
import yugiohProjetoComSecurity.demo.entiny.Carta;
import yugiohProjetoComSecurity.demo.service.CartaService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/yugioh")
public class CartaController {

    private CartaService cartaService;

    public CartaController(CartaService cartaService) {
        this.cartaService = cartaService;
    }

    @PostMapping
    public ResponseEntity<String> save(@Validated @RequestBody CartaDTO dto){
        cartaService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Carta adicionada!");
    }

    @GetMapping("/pegarAll")
    public List<Carta> todasAsCartasPoremSoNomeEDescricao(){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(cartaService.findByAll()).getBody();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deletar(@PathVariable Integer id){
        cartaService.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/buscar/{nome}")
    public List<Carta> pesquisarCarta(@RequestBody @PathVariable String nome ){
        List<Carta> cartaNome = cartaService.buscarPorNome(nome);
        return ResponseEntity.ok().body(cartaNome).getBody();
    }

    @GetMapping("{id}")
    public ResponseEntity<Carta> procurarPorId(@PathVariable Integer id){
        Carta cartaId = cartaService.buscarPorId(id);
        return ResponseEntity.ok().body(cartaId);
    }
}


