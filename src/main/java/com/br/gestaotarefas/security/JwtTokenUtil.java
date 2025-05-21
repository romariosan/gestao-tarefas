package com.br.gestaotarefas.security;

import com.br.gestaotarefas.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION;

    public String extrairUsuario(String token) {
        return extrairClaim(token, Claims::getSubject);
    }
    public <T> T extrairClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extrairTodasClaims(token);
        return claimsResolver.apply(claims);
    }
    public boolean validarToken(String token, UserDetails userDetails) {
        final String username = extrairUsuario(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpirado(token);
    }


    private boolean isTokenExpirado(String token) {
        return extrairExpiracao(token).before(new Date());
    }


    private Date extrairExpiracao(String token) {
        return extrairClaim(token, Claims::getExpiration);
    }
    private Claims extrairTodasClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String obterToken(Usuario usuario) {
        return gerarToken(new HashMap<>(), usuario);
    }

    public String gerarToken(
            Map<String, Object> extraClaims, Usuario usuario) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(usuario.getUsuario())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(EXPIRATION + 1000 * 60 * 24))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}