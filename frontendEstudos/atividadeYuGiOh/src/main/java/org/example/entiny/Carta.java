package org.example.entiny;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "carta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull(message = "Valor do campo name nao pode ser vazio")
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String tipo;
    @Column(nullable = false)
    private String atributo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Integer nivel;

    @Column(nullable = false)
    private Integer atk;
    @Column(nullable = false)
    private Integer def;
}
