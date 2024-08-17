package yugiohProjetoComSecurity.demo.controller.exeptions;

public class TaErradoIssoAi extends RuntimeException {
    public TaErradoIssoAi(String mensagem){
        super(mensagem);
    }
}
