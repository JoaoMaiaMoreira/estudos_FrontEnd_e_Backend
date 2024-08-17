//package joao.domain.repositorio;
//
//import joao.entiny.Cliente;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//import javax.persistence.TypedQuery;
//import java.util.List;
//
//import joao.entiny.Cliente;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.RowMapper;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//import javax.persistence.TypedQuery;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.List;
//
//@Repository
//public class  ClientesComRepositoryJPANaMao {
////
////    private static String ADICIONAR = "insert into cliente (nome) values (?) ";
////    private static String SELECT_ALL = "SELECT * FROM CLIENTE";
////
////    private static String ATUALIZAR = "update cliente set nome = ? where id = ?";
////
////    private static String DELETAR = "delete from cliente where id = ?";
////
////    @Autowired
////    private JdbcTemplate jdbcTemplate;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    //Tem que ter o Trasactional pois ele indica qual metodo esta fazendo uma transacao na base de dados
//    @Transactional
//
//    public Cliente salvar(Cliente cliente){
////        jdbcTemplate.update(ADICIONAR, new Object[]{cliente.getNome()} );
//        entityManager.persist(cliente);
//
//        return cliente;
//    }
//
//    @Transactional
//    public Cliente atualizar(Cliente cliente){
////        jdbcTemplate.update(ATUALIZAR, new Object[]{cliente.getNome(), cliente.getId()});
//        entityManager.merge(cliente);
//        //merge sincroniza o cliente com o entityManeger fazendo com que elee fique atualizado no EntidyMAneger
//        return cliente;
//    }
//    @Transactional
//    public void deletar(Cliente cliente){
////        deletar(cliente.getId());
//        if(!entityManager.contains(cliente)){
//            cliente = entityManager.merge(cliente);
//        }
//        entityManager.remove(cliente);
//    }
//    @Transactional
//    public void deletar(Integer id){
////        jdbcTemplate.update(DELETAR, new Object[]{id});
//        Cliente cliente = entityManager.find(Cliente.class, id);
//        deletar(cliente);
//    }
//
//
//
//    @Transactional(readOnly = true)
//    //trabsacao apenas de leitura, nao é obrigatorio
//    public List<Cliente> buscarPorNome(String nome){
////        return jdbcTemplate.query(
////                SELECT_ALL.concat(" where nome like ? "),
////                new Object[]{"%" + nome + "%" },
////                obterCliente());
//        String jpql = " select c from Cliente c where c.nome like :nome ";
//        //":nome" definir um parametro jpa
//        TypedQuery<Cliente> query =  entityManager.createQuery(jpql, Cliente.class);
//        query.setParameter("nome", "%" + nome +"%");
//        return query.getResultList();
//    }
//
//    @Transactional
//    public List<Cliente> obterTodos(){
////        return jdbcTemplate.query(SELECT_ALL, obterCliente());
//        return entityManager.createQuery("from Cliente", Cliente.class).getResultList();
//    }
//
////    private static RowMapper<Cliente> obterCliente() {
////        return new RowMapper<Cliente>() {
////            @Override
////            public Cliente mapRow(ResultSet resultSet, int i) throws SQLException {
////                Integer id = resultSet.getInt("id");
////                String nome = resultSet.getString("nome");
////                return new Cliente(id, nome);
////            }
////        };
////    }
//}
//
