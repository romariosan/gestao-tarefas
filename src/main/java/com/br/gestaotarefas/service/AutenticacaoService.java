package com.br.gestaotarefas.service;
import com.br.gestaotarefas.dto.AutenticacaoRequest;
import com.br.gestaotarefas.dto.AutenticacaoResponse;
import com.br.gestaotarefas.dto.RegistroRequest;
import com.br.gestaotarefas.model.Usuario;
import com.br.gestaotarefas.repository.UsuarioRepository;
import com.br.gestaotarefas.security.JwtTokenUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AutenticacaoService {
    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenUtil jwtTokenUtil;

    private final AuthenticationManager authenticationManager;

    public AutenticacaoResponse registrar(RegistroRequest request) {
        var user = Usuario.builder()
                .usuario(request.getUsuario())
                .senha(passwordEncoder.encode(request.getSenha()))
                .build();
        usuarioRepository.save(user);
        var jwtToken = jwtTokenUtil.obterToken(user);
        return AutenticacaoResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AutenticacaoResponse realizarAutenticacao(AutenticacaoRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsuario(),
                        request.getSenha()));
        var user = usuarioRepository.findByUsuario(request.getUsuario()).orElseThrow();
        var jwtToken = jwtTokenUtil.obterToken(user);
        return AutenticacaoResponse.builder()
                .token(jwtToken)
                .build();
    }
}
