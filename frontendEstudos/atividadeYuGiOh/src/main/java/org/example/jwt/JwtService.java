package org.example.jwt;


import org.example.entiny.Usuario;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class JwtService {
    private String expericao;
    private String chaveAssinatura;

    public String gerarToken(Usuario usuario){
        long horaDaExpiracao = Long.valueOf(expericao);

        LocalDateTime dataHoraExpiracao = LocalDateTime.now().plusMinutes(horaDaExpiracao);
        Instant instant = dataHoraExpiracao.atZone(ZoneId.systemDefault()).toInstant();
        Date data = Date.from(instant);


    }












}
