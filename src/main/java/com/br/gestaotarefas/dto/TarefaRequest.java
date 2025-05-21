package com.br.gestaotarefas.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TarefaRequest {
    private String titulo;
    private String descricao;
    private String status;
    private String prioridade;
    private LocalDate data;
    private String usuario;
}
