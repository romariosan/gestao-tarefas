package com.br.gestaotarefas.service;

import com.br.gestaotarefas.dto.TarefaRequest;
import com.br.gestaotarefas.dto.TarefaResponse;
import com.br.gestaotarefas.model.Tarefa;
import com.br.gestaotarefas.repository.TarefaRepository;
import com.br.gestaotarefas.repository.TarefaRepositoryCustom;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private TarefaRepositoryCustom tarefaRepositoryCustom;

    public TarefaResponse salvar(TarefaRequest tarefaRequest) {
        var tarefa = Tarefa.builder().usuario(tarefaRequest.getUsuario()).status(tarefaRequest.getStatus()).data(tarefaRequest.getData()).prioridade(tarefaRequest.getPrioridade()).build();
        return new TarefaResponse(tarefaRepository.save(tarefa));
    }

    public Page<TarefaResponse> listarTarefasComFiltro(String usuario, String status, String prioridade, LocalDate data, Pageable pageable) {
        Page<Tarefa> tarefas = tarefaRepositoryCustom.buscarComFiltro(usuario, status, prioridade, data, pageable);
        return tarefas.map(TarefaResponse::new);
    }


    public void deletar(Long id) {
        tarefaRepository.deleteById(id);
    }

    public TarefaResponse atualizar(Long id, TarefaRequest tarefaAtualizada) {
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada"));
        tarefa.setStatus(tarefaAtualizada.getStatus());
        tarefa.setData(tarefaAtualizada.getData());
        tarefa.setPrioridade(tarefaAtualizada.getPrioridade());
        Tarefa tarefaSalva = tarefaRepository.save(tarefa);
        return new TarefaResponse(tarefaSalva);
    }

}