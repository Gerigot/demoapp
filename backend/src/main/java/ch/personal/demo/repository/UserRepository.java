package ch.personal.demo.repository;

import org.springframework.data.repository.CrudRepository;

import ch.personal.demo.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
    
}
