package com.br.gestaotarefas.controller;


import com.br.gestaotarefas.dto.TarefaRequest;
import com.br.gestaotarefas.dto.TarefaResponse;
import com.br.gestaotarefas.service.TarefaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @Operation(summary = "Criar nova tarefa", description = "Cria uma nova tarefa associada ao usuário autenticado.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Tarefa criada com sucesso"),
            @ApiResponse(responseCode = "401", description = "Não autorizado")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public TarefaResponse criar(@RequestBody TarefaRequest tarefa, Authentication auth) {
        tarefa.setUsuario(auth.getName());
        return tarefaService.salvar(tarefa);
    }

    @Operation(summary = "Listar tarefas do usuário autenticado", description = "Retorna uma lista de tarefas filtradas para o usuário autenticado.", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Lista de tarefas retornada com sucesso"), @ApiResponse(responseCode = "401", description = "Token JWT ausente ou inválido")})
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping
    public List<TarefaResponse> listar(Authentication auth) {
        return tarefaService.listarPorUsuario(auth.getName());
    }

    @Operation(summary = "Atualizar uma tarefa existente", description = "Atualiza os dados da tarefa identificada pelo ID fornecido.", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Tarefa atualizada com sucesso"), @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")})
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping("/{id}")
    public TarefaResponse atualizar(@PathVariable Long id, @RequestBody TarefaRequest tarefaAtualizada) {
        return tarefaService.atualizar(id, tarefaAtualizada);
    }

    @Operation(summary = "Deletar uma tarefa", description = "Remove a tarefa identificada pelo ID fornecido.", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Tarefa deletada com sucesso"), @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")})
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        tarefaService.deletar(id);
    }
}