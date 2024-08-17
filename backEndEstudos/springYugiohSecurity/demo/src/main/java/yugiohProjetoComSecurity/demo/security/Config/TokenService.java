package yugiohProjetoComSecurity.demo.security.Config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import yugiohProjetoComSecurity.demo.entiny.Usuario;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("{api.security.chaveSecret}")
    private String secret;

    public String generateToken(Usuario usuario){
        try{
            //secret, é a forma que nossos hash sejam unicos na nossa aplicacao, mesmo que chave de assinaura
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("yugioh-api") //Quem foi o emissor, quem criou
                    .withSubject(usuario.getEmail())//usuario que esta recebendo esse token
                    .withExpiresAt(tempoQueOTokenVaiExpirar())//tempo de expiracao
                    .sign(algorithm); //a chave de assinatura

            return token;
        }catch (JWTCreationException e){
            throw new RuntimeException("EROO de gerar token", e);
        }

    }

    //essa string vai retornar o usuario que esta presente no token
    public String validarToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("yugioh-api")
                    .build()
                    .verify(token)
                    .getSubject();//pegamos o usuario
        }catch(JWTVerificationException exception){
            return ""; //o metodo que precisar vai perceber que esse usuario nao esta autorizado
        }
    }

    private Instant tempoQueOTokenVaiExpirar(){
        return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-03:00")); //To instant converte tipo to string
    }

}
