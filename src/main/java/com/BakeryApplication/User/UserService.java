package com.BakeryApplication.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> allUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int _id){
        return userRepository.findById(_id);
    }
}
