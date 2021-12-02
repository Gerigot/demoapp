package ch.personal.demo.controller;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.personal.demo.repository.InvitationRepository;

@RestController
@RequestMapping("api")
public class InvitationsController {
    
    @Autowired
    InvitationRepository invitationRepository;


    @PostMapping(path = "/invitations/{invitationId}/absent")
    public boolean setAbsent(@PathVariable Long invitationId, @RequestBody JsonNode params) {
        if (params.has("absent")) {
            Boolean absent = params.get("absent").asBoolean();
            invitationRepository.findById(invitationId).ifPresent(invitation -> {
                invitation.setAbsent(absent);
                invitationRepository.save(invitation);
            });
        }
        return true;
    }
}
