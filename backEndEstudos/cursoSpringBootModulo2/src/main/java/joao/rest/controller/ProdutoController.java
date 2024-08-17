package joao.rest.controller;

import javafx.scene.chart.ValueAxis;
import joao.domain.entiny.Produto;
import joao.domain.repository.Produtos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private Produtos produtos;

    @Autowired
    public ProdutoController(Produtos produtos) {
        this.produtos = produtos;
    }

    @GetMapping("{id}")
    public Produto get(@PathVariable Integer id){
        return produtos.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto nao existe"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produto save(@RequestBody Produto produto){
        return produtos.save(produto);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id){
        produtos.findById(id).map(p -> {
            produtos.delete(p);
            return Void.TYPE;
        }).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nao é possivel deletar, esse produto nao existe"));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Integer id, @RequestBody Produto updateProduto){
        produtos.findById(id).map(p -> {
            updateProduto.setId(p.getId());
            produtos.save(updateProduto);
            return updateProduto;
        }).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não existe, logo nao é possivel atualizar"));
    }

    @GetMapping
    public List<Produto> pesquisa(Produto oqOManoQuerAchar){
        ExampleMatcher comoAPesquisaVaiFuncionar = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example example = Example.of(oqOManoQuerAchar, comoAPesquisaVaiFuncionar);
        return produtos.findAll(example);
    }

}
