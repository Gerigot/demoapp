package ch.personal.demo.repository;

import org.springframework.data.repository.CrudRepository;

import ch.personal.demo.entity.Talk;

public interface TalkRepository extends CrudRepository<Talk, Long> {
    
}
