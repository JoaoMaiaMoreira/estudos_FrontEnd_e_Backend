package joao.rest.controller;

import joao.exception.PedidoNaoEncontradoExeception;
import joao.exception.RegraNegocioException;
import joao.rest.ApiErros;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

//@ControllerAdvice
@RestControllerAdvice
public class ApplicationControllerAdvice {
   @ExceptionHandler(RegraNegocioException.class)
   @ResponseStatus(HttpStatus.BAD_REQUEST)
   public ApiErros handleRegraNegocioException(RegraNegocioException ex){
            String mensagemErro = ex.getMessage();
            return new ApiErros(mensagemErro);


   }

    @ExceptionHandler(value = PedidoNaoEncontradoExeception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErros handlePedidoNotDoundException(PedidoNaoEncontradoExeception ex){
        return  new ApiErros(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class )
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErros handleMethodNotValidexception(MethodArgumentNotValidException ex){
       List<String> erros = ex.getBindingResult().getAllErrors().stream().map(erro -> erro.getDefaultMessage()).collect(Collectors.toList());
        return new ApiErros(erros);
   }



}
