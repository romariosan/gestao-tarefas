package com.br.gestaotarefas.repository;


import com.br.gestaotarefas.model.Tarefa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface TarefaRepositoryCustom {
    Page<Tarefa> buscarComFiltro(String username, String status, String prioridade, LocalDate data, Pageable pageable);
}