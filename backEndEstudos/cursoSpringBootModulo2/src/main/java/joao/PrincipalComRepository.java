//package joao;
//
//import joao.domain.repositorio.Clientes;
//import joao.entiny.Cliente;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//
//import java.util.List;
//
//import joao.domain.repositorio.Clientes;
//import joao.entiny.Cliente;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//
//import java.util.List;
//
//@SpringBootApplication
//
//public class PrincipalComRepository {
//    @Bean
//    public CommandLineRunner init(@Autowired Clientes clientes){
//        return args -> {
//            System.out.println("Salavando cliente");
//            clientes.salvar(new Cliente("Mc vv"));
//
//            Cliente cliente2 = new Cliente();
//            cliente2.setNome("Carlinhos");
//            clientes.salvar((cliente2));
//
//            System.out.println("Vou mostrar na tela");
//
//            List<Cliente> todosClientes = clientes.obterTodos();
//            todosClientes.forEach(System.out::println);
//
//            System.out.println("Atualizando");
//            todosClientes.forEach(c -> {
//                c.setNome(c.getNome() + ".map brabo");
//                clientes.atualizar(c);
//            });
//
//            System.out.println("Busca");
//
//            clientes.buscarPorNome("vv").forEach(System.out::println);
//
//            System.out.println("Apagar geral");
//
//            todosClientes.forEach(c -> {
//                clientes.deletar(c);
//            });
//
//
//            todosClientes = clientes.obterTodos();
//            if(todosClientes.isEmpty()){
//                System.out.println("Ta vazio, nao tem cliente");
//            }else{
//                todosClientes.forEach(System.out::println);
//            }
//
//
//        };
//    }
//    public static void main(String[] args) {
//        SpringApplication.run(Principal.class, args);
//    }
//}
//
