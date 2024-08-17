package com.example.demo.repository;

import com.example.demo.entity.TarefaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarefaRepository extends JpaRepository<TarefaEntity, Integer> {

}
