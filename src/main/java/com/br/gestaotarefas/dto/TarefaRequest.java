package com.br.gestaotarefas.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String status;
    private String prioridade;
    private LocalDate data;
    @JsonIgnore
    private String usuario;
}
