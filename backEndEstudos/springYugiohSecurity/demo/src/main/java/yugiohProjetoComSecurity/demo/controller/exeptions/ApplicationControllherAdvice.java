package yugiohProjetoComSecurity.demo.controller.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import yugiohProjetoComSecurity.demo.controller.ApiErros;

@ControllerAdvice
public class ApplicationControllherAdvice {
    @ExceptionHandler(TaErradoIssoAi.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiErros execoes(TaErradoIssoAi taErrado){
        String mensagemDeErro = taErrado.getMessage();
        return new ApiErros(mensagemDeErro);
    }
}
