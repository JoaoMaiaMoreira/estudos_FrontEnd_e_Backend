//package joao;
//
//import joao.domain.entiny.Pedido;
//import joao.domain.repository.Clientes;
//import joao.domain.entiny.Cliente;
//import joao.domain.repository.Pedidos;
//import org.apache.tomcat.jni.Local;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.List;
//
//@SpringBootApplication
//public class PrincipalAntigo {
//    @Bean
//    public CommandLineRunner init(
//            @Autowired Clientes clientes,
//            @Autowired Pedidos pedidos
//    ){
//        return args -> {
////            System.out.println("Salavando cliente");
////            clientes.save(new Cliente("Mc vv"));
////
////
////
////            Cliente cliente2 = new Cliente();
////            cliente2.setNome("Carlinhos");
////            clientes.save((cliente2));
//
//            System.out.println("Salvando cliente para o pedido la");
//            Cliente fulano = new Cliente("Neyma");
//            clientes.save(fulano);
//
//            Pedido p = new Pedido();
//            p.setCliente(fulano);
//            p.setDataPedido(LocalDate.now());
//            p.setTotalPedido(BigDecimal.valueOf(100));
//            pedidos.save(p);
//
////            Cliente cliente = clientes.findClienteFetchPedidos(fulano.getId());
////            System.out.println(cliente);
////            System.out.println(cliente.getPedidos());
//
//            pedidos.findByCliente(fulano);
//            pedidos.findByCliente(fulano).forEach(System.out::println);
//
//
////            System.out.println("Vou mostrar na tela");
////
////            List<Cliente> todosClientes = clientes.findAll();
////            todosClientes.forEach(System.out::println);
//
//
////            System.out.println("Atualizando");
////            todosClientes.forEach(c -> {
////                c.setNome(c.getNome() + ".map brabo");
////                clientes.save(c);
////            });
////
////            System.out.println("Busca");
////
////            clientes.encontrarPorNome("vv").forEach(System.out::println);
////
////            System.out.println("Apagar geral");
////
////            todosClientes.forEach(c -> {
////                clientes.delete(c);
////            });
////
////
////            todosClientes = clientes.findAll();
////            if(todosClientes.isEmpty()){
////                System.out.println("Ta vazio, nao tem cliente");
////            }else{
////                todosClientes.forEach(System.out::println);
////            }
////
////            boolean existe = clientes.existsByNome("Carlinhos");
////            System.out.println(existe);
//        };
//    }
//    public static void main(String[] args) {
//        SpringApplication.run(Principal.class, args);
//    }
//}
