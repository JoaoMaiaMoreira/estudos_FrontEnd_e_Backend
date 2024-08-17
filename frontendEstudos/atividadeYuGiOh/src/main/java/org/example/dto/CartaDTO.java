package org.example.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CartaDTO {

    @NotNull(message = "Valor do campo name nao pode ser vazio")
    private String nome;
    private Integer atk;
    private Integer def;
    private Integer nivel;
    private String tipo;
    private String atributo;
    private String descricao;

}
