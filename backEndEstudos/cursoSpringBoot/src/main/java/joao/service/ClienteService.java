package joao.service;

import joao.model.Cliente;
import joao.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

//    @Autowired
    private ClienteRepository repository;

//    @Autowired
//    public void setRepository(ClienteRepository repository) {
//        this.repository = repository;
//    }

    @Autowired
    public ClienteService(ClienteRepository repository){
            this.repository = repository;
    }

    public void salvarCliente(Cliente cliente){
        validarCliente(cliente);
        this.repository.salvar(cliente);
    }

    public void validarCliente(Cliente cliente){

    }
}
