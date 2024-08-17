package joao.rest.controller;

import joao.domain.entiny.Cliente;
import joao.domain.repository.Clientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private Clientes clientes;
    @Autowired
    public ClienteController(Clientes clientes) {
        this.clientes = clientes;
    }

    //    @RequestMapping(value = {"/hello/{nome}", "/helloDois"}, method = RequestMethod.GET)
//public String helloCliente(@PathVariable("nome") String nomeCliente, @RequestBody Cliente cliente){
//    return String.format("Hello %s ", nomeCliente);
//}
    //porem é melhor >

    @GetMapping("{id}")
    public  Cliente getClienteById(@PathVariable Integer id){
         return clientes.findById(id).orElseThrow(() -> new ResponseStatusException( HttpStatus.NOT_FOUND, "Cliente não encontrado") );
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente saveCliente(@RequestBody @Valid Cliente cliente){
       return  clientes.save(cliente);
    }
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCliente(@PathVariable Integer id){
        clientes.findById(id).map(cliente -> {
            clientes.delete(cliente);
            return cliente;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente nao encontrado"));

    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)

    public void atualizarCliente(@PathVariable("id") Integer id, @RequestBody Cliente cliente){
         clientes.findById(id).map( clienteExistente -> {
                    cliente.setId(clienteExistente.getId());
                    clientes.save(cliente);
                    return clienteExistente;
                } ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente nao encontrado"));
    }

    @GetMapping
    public List<Cliente> filtrarCliente(Cliente filtro){
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher( ExampleMatcher.StringMatcher.CONTAINING);

        Example example = Example.of(filtro, matcher);
        return clientes.findAll(example);
    }


}
