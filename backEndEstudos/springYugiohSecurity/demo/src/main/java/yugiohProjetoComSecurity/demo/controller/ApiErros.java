package yugiohProjetoComSecurity.demo.controller;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public class ApiErros {
    private final List<String> erros;

    public ApiErros(String mensagemDeErro) {
        this.erros = Arrays.asList(mensagemDeErro);
    }

    public List<String> getErros() {
        return erros;
    }
}
