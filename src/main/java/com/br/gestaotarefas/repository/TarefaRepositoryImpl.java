package com.br.gestaotarefas.repository;

import com.br.gestaotarefas.model.Tarefa;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.stereotype.Repository;

import jakarta.persistence.criteria.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TarefaRepositoryImpl implements TarefaRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Tarefa> buscarComFiltro(String usuario, String status, String prioridade, LocalDate data, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tarefa> query = cb.createQuery(Tarefa.class);
        Root<Tarefa> root = query.from(Tarefa.class);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(root.get("usuario"), usuario));

        if (status != null) predicates.add(cb.equal(root.get("status"), status));
        if (prioridade != null) predicates.add(cb.equal(root.get("prioridade"), prioridade));
        if (data != null) predicates.add(cb.equal(root.get("data"), data));

        query.where(cb.and(predicates.toArray(new Predicate[0])));
        query.orderBy(QueryUtils.toOrders(pageable.getSort(), root, cb));

        TypedQuery<Tarefa> typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());

        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Tarefa> countRoot = countQuery.from(Tarefa.class);
        countQuery.select(cb.count(countRoot));
        List<Predicate> countPredicates = new ArrayList<>();
        countPredicates.add(cb.equal(countRoot.get("usuario"), usuario));

        if (status != null) countPredicates.add(cb.equal(countRoot.get("status"), status));
        if (prioridade != null) countPredicates.add(cb.equal(countRoot.get("prioridade"), prioridade));
        if (data != null) countPredicates.add(cb.equal(countRoot.get("data"), data));
        countQuery.where(cb.and(countPredicates.toArray(new Predicate[0])));

        Long total = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(typedQuery.getResultList(), pageable, total);
    }
}