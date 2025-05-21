package com.br.gestaotarefas.repository;

import com.br.gestaotarefas.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

}