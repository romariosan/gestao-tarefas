package com.br.gestaotarefas.service;

import com.br.gestaotarefas.dto.TarefaRequest;
import com.br.gestaotarefas.dto.TarefaResponse;
import com.br.gestaotarefas.model.Tarefa;
import com.br.gestaotarefas.repository.TarefaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    public TarefaResponse salvar(TarefaRequest tarefaRequest) {
        var tarefa = Tarefa.builder().usuario(tarefaRequest.getUsuario()).descricao(tarefaRequest.getDescricao()).status(tarefaRequest.getStatus()).titulo(tarefaRequest.getTitulo()).build();
        return new TarefaResponse(tarefaRepository.save(tarefa));
    }

    public List<TarefaResponse> listarPorUsuario(String username) {
        List<Tarefa> tarefas = tarefaRepository.findByUsuario(username);
        return tarefas.stream().map(TarefaResponse::new).collect(Collectors.toList());
    }


    public void deletar(Long id) {
        tarefaRepository.deleteById(id);
    }

    public TarefaResponse atualizar(Long id, TarefaRequest tarefaAtualizada) {
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada"));

        tarefa.setTitulo(tarefaAtualizada.getTitulo());
        tarefa.setDescricao(tarefaAtualizada.getDescricao());
        tarefa.setStatus(tarefaAtualizada.getStatus());

        Tarefa tarefaSalva = tarefaRepository.save(tarefa);
        return new TarefaResponse(tarefaSalva);
    }

}