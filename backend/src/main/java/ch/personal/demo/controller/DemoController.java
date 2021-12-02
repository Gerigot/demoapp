package ch.personal.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.personal.demo.entity.Invitation;
import ch.personal.demo.entity.Talk;
import ch.personal.demo.entity.User;
import ch.personal.demo.repository.InvitationRepository;
import ch.personal.demo.repository.TalkRepository;
import ch.personal.demo.repository.UserRepository;

@RestController
@RequestMapping("api")
public class DemoController {

    @Autowired
    TalkRepository talkRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    InvitationRepository invitationRepository;



    @GetMapping(path = "/demo", produces = "application/json")
    public Iterable<Talk> getDemo() {

        return talkRepository.findAll();
    }

}
