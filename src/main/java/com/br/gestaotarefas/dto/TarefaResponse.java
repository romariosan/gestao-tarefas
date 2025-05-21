package com.br.gestaotarefas.dto;


import com.br.gestaotarefas.model.Tarefa;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TarefaResponse {
    private Long id;
    private String titulo;
    private String descricao;
    private String status;
    private String prioridade;
    private LocalDate data;
    private String username;
    public TarefaResponse(Tarefa tarefa) {
        this.id = tarefa.getId();
        this.titulo = tarefa.getTitulo();
        this.descricao = tarefa.getDescricao();
        this.status = tarefa.getStatus();
    }
}
