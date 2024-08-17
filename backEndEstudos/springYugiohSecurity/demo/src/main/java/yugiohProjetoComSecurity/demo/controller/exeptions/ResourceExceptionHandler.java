//package yugiohProjetoComSecurity.demo.controller.exeptions;
//
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import yugiohProjetoComSecurity.demo.service.exeptions.EntityNaoEncontrada;
//
//import java.time.Instant;
//
//@ControllerAdvice
//public class ResourceExceptionHandler {
//    @ExceptionHandler(EntityNaoEncontrada.class)
//    public ResponseEntity<StandarError> entityNaoEncontrada(EntityNaoEncontrada e, HttpServletRequest request){
//        StandarError erro = new StandarError();
//        erro.setTimestamp(Instant.now());
//        erro.setStatus(HttpStatus.NOT_FOUND.value());
//        erro.setErros("Not found");
//        erro.setMessage(e.getMessage());
//        erro.setPath(request.getRequestURI());
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
//    }
//}
