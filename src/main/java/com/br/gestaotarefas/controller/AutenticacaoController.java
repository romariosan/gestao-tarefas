package com.br.gestaotarefas.controller;

import com.br.gestaotarefas.dto.AutenticacaoRequest;
import com.br.gestaotarefas.dto.AutenticacaoResponse;
import com.br.gestaotarefas.dto.RegistroRequest;
import com.br.gestaotarefas.service.AutenticacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AutenticacaoController {

    private final AutenticacaoService autenticacaoService;

    @Operation(summary = "Registrar novo usuário", description = "Cria uma nova conta de usuário com as informações fornecidas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário registrado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos para o registro")
    })
    @PostMapping("/registrar")
    public ResponseEntity<AutenticacaoResponse> register(@RequestBody RegistroRequest request) {
        return ResponseEntity.ok(autenticacaoService.registrar(request));
    }

    @Operation(summary = "Autenticar usuário", description = "Autentica o usuário e retorna o token JWT.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário autenticado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    @PostMapping("/autenticar")
    public ResponseEntity<AutenticacaoResponse> autenticar(@RequestBody AutenticacaoRequest request) {
        return ResponseEntity.ok(autenticacaoService.realizarAutenticacao(request));
    }
}