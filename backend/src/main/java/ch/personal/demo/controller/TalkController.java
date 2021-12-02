package ch.personal.demo.controller;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.personal.demo.entity.Invitation;
import ch.personal.demo.entity.Talk;
import ch.personal.demo.repository.InvitationRepository;
import ch.personal.demo.repository.TalkRepository;
import ch.personal.demo.repository.UserRepository;

@RestController
@RequestMapping("api")
public class TalkController {

    @Autowired
    TalkRepository talkRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    InvitationRepository invitationRepository;

    @GetMapping(path = "talks", produces = "application/json")
    public Iterable<Talk> geTallTalks() {
        return talkRepository.findAll();
    }

    @GetMapping(path = "talks/{talkId}", produces = "application/json")
    public Optional<Talk> getTalkById(@PathVariable long talkId) {
        return talkRepository.findById(talkId);
    }

    @PostMapping(path = "/talks")
    public Talk createTalk(@RequestBody Talk talk) {
        return talkRepository.save(talk);
    }

    @PostMapping(path = "/talks/{talkId}/addInvitation")
    public Optional<Talk> addInvitation(@PathVariable Long talkId, @RequestBody JsonNode params) {
        if (params.has("userId")) {
            Long userId = params.get("userId").asLong();
            userRepository.findById(userId).ifPresent(user -> {
                talkRepository.findById(talkId).ifPresent(talk -> {
                    Invitation invitation = new Invitation();
                    invitation.setTalk(talk);
                    invitation.setUser(user);
                    invitationRepository.save(invitation);
                });
            });
        }
        return talkRepository.findById(talkId);
    }

    @GetMapping(path = "talks/{talkId}/selectParticipant", produces = "application/json")
    public Invitation selectRandomParticipant(@PathVariable long talkId) {
        var wrapper = new Object() {
            Invitation selectedParticipant = null;
        };
        talkRepository.findById(talkId).ifPresent(selectedTalk -> {
            List<Invitation> notAbsentParticipant = selectedTalk.getExpectedParticipants().stream()
                    .filter(partecipant -> !partecipant.isAbsent()).collect(Collectors.toList());
            wrapper.selectedParticipant = notAbsentParticipant.get((new Random().nextInt(notAbsentParticipant.size())));
        });
        return wrapper.selectedParticipant;
    }

}
