package com.br.gestaotarefas.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AutenticacaoResponse {

    private String token;
    private String mensagem;
}
