package joao.springBoot3.sbootexpsecurity.Service;

import jakarta.transaction.Transactional;
import joao.springBoot3.sbootexpsecurity.Repository.GrupoRepository;
import joao.springBoot3.sbootexpsecurity.Repository.UsuarioGrupoRepository;
import joao.springBoot3.sbootexpsecurity.Repository.UsuarioRepository;
import joao.springBoot3.sbootexpsecurity.entity.Grupo;
import joao.springBoot3.sbootexpsecurity.entity.Usuario;
import joao.springBoot3.sbootexpsecurity.entity.UsuarioGrupo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final GrupoRepository grupoRepository;
    private final UsuarioGrupoRepository usuarioGrupoRepository;
    private final PasswordEncoder passwordEncoder; //para codificar a senha

    @Transactional
    public Usuario salvar(Usuario usuario, List<String> nomeGrupo){
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());//coisinha basica pega a senha do usuario passado codifica e retona seta ela de volta
        usuario.setSenha(senhaCriptografada);
        usuarioRepository.save(usuario);

        List<UsuarioGrupo> listaUsuarioGrupo = nomeGrupo.stream().map(g -> {
            Optional<Grupo> possivelGrupo = grupoRepository.findByNome(g);
            if (possivelGrupo.isPresent()) {
                Grupo grupo = possivelGrupo.get();
                return new UsuarioGrupo(usuario, grupo);
            }

            return null;

        }).filter(grupo -> grupo != null).collect(Collectors.toList());//para se caso ter uma lista de objet null
        usuarioGrupoRepository.saveAll(listaUsuarioGrupo);

        return usuario;
    }

    public Usuario obterUsuarioComPermissoes(String login){
        Optional<Usuario> usuarioOptional = usuarioRepository.findByLogin(login);
        if(usuarioOptional.isEmpty()){
            return null;
        }

        Usuario usuario = usuarioOptional.get();
        List<String> permissoes = usuarioGrupoRepository.findPermissoesByUsuario(usuario);
        usuario.setPermissoes(permissoes); // nao existe esse setPermissoes no banco, vai ser criado so para o transporte de informacao, essa permissao setada é a permissao buscada no banco referente ao nome do usuario

        return usuario;
    }

}
