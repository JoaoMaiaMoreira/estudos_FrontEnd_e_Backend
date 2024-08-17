package joao.springBoot3.sbootexpsecurity.Service;

import jakarta.transaction.Transactional;
import joao.springBoot3.sbootexpsecurity.Repository.GrupoRepository;
import joao.springBoot3.sbootexpsecurity.entity.Grupo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrupoSevice {

    @Autowired
    private GrupoRepository grupoRepository;

    @Transactional
    public Grupo save(Grupo grupo) {
        return grupoRepository.save(grupo);

    }

    public List<Grupo> findAll() {
        return grupoRepository.findAll();
    }
}
