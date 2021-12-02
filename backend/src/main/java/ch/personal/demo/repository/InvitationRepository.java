package ch.personal.demo.repository;

import org.springframework.data.repository.CrudRepository;

import ch.personal.demo.entity.Invitation;

public interface InvitationRepository extends CrudRepository<Invitation, Long> {
    
}
