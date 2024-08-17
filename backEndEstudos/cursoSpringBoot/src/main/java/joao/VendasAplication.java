package joao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController

public class VendasAplication {

    @Value("${application.name}")
    private String applicationName;

    @Value("${application.local}")
    private String applicationLocal;

    @GetMapping("/hello")
    public String helloWorld(){
        return applicationName;

    }

   @Gato
    private Animal animal;
    @Bean
    public CommandLineRunner burroExecutar(){
        return args -> {
           this.animal.fazerBarulho();
        };
    }

    @GetMapping("/teste")
    public String teste(){
        return applicationLocal;
    }


    public static void main(String[] args) {
        SpringApplication.run(VendasAplication.class, args);
    }
}
