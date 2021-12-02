package ch.personal.demo.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.personal.demo.entity.User;
import ch.personal.demo.repository.UserRepository;

@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/users", produces = "application/json")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping(value = "/users/{id}", produces = "application/json")
    public Optional<User> getUser(@PathVariable("id") Long id) {
        return userRepository.findById(id);

    }

    @PostMapping(value = "/users", produces = "application/json")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

}
