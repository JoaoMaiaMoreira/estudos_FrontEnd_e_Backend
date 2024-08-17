package joao.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import joao.VendasApplication;
import joao.domain.entiny.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class JwtService {
    @Value("${security.jwt.expiracao}")
    private String expericao;
    @Value("${security.jwt.chave-assinatura}")
    private String chaveAssinatura;

    public String gerarToken(Usuario usuario){
        //tranforma em Long
        long expString = Long.valueOf(expericao);
        //pega a hora atual e adiona o expstring que é nosso tempo que o token expira
        LocalDateTime dataHoraExpiracao = LocalDateTime.now().plusMinutes(expString);
        //transforma o dataHoraExpiracao em um objeto Date, o pedido na biblioteca utilizada
        Instant instant = dataHoraExpiracao.atZone(ZoneId.systemDefault()).toInstant();
        Date data = Date.from(instant);

//        HashMap<String, Object> claims = new HashMap<>();
//        claims.put("emaildousuario", "usuario@gmail.com");
//        claims.put("roles", "admin");

        return Jwts.builder()
                .setSubject(usuario.getLogin())
                .setExpiration(data)
//                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, chaveAssinatura)
                .compact();
        //pega todas as informacoes para gerar um token, o Subeject é um ocdigo para saber qual usuario esta pedindo o token
    }

    private Claims obterClaims(String token) throws ExpiredJwtException {
        return Jwts
                .parser()
                .setSigningKey(chaveAssinatura)//chave do token
                .parseClaimsJwt(token)//passe o token
                .getBody();//retorna os clains do token que é as informacoes que foram passadas
    }

    public boolean tokenValido(String token) {
        try{
            Claims claims = obterClaims(token);
            Date dataExpiracao = claims.getExpiration();
            //converte a data da expiracao em localdate para poder fazer a comparacao com o isAfter
            LocalDateTime dataDaExpiracaoEmLocalDate = dataExpiracao.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            return !LocalDateTime.now().isAfter(dataDaExpiracaoEmLocalDate);

        }catch (Exception e){
            return false;
        }
    }

    public String obterUsuario(String token) throws ExpiredJwtException{
        return (String) obterClaims(token).getSubject();
        //se caso o obterClaims dar um exeption ali, o obter Usuario retorna o obter usuario
        //(String) praticamente garante a conversao do retorno de getSubject em String, pois pode vim um objeto
    }

//    public static void main(String[] args) {
//        ConfigurableApplicationContext contexto = SpringApplication.run(VendasApplication.class);
//        JwtService service = contexto.getBean(JwtService.class);
//        Usuario usuario = Usuario.builder().login("caboco").build();
//        String token = service.gerarToken(usuario);
//        System.out.printf(token);
//
//        boolean tokenValido = service.tokenValido(token);
//        System.out.printf("O token está valido: " + tokenValido);
//        System.out.printf("Login: " + service.obterUsuario(token));
//    }

}
