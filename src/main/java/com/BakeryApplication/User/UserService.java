package com.BakeryApplication.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> allUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String _id){
        return userRepository.findById(_id);
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public void addUserApplyModifcations(User user){
        user.setCreationDate(LocalDate.now());
        user.setRole("customer");

        BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
        user.setPassword(bc.encode(user.getPassword()));

    }

    public User updateUser(String _id, Map<String, Object> updates) {
        Optional<User> existingUserOptional = userRepository.findById(_id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            updates.forEach((key, value) -> {
                switch (key) {
                    case "creationDate":
                        existingUser.setCreationDate((LocalDate) value);
                        break;
                    case "role":
                        existingUser.setRole((String) value);
                        break;
                    case "firstName":
                        existingUser.setFirstName((String) value);
                        break;
                    case "lastName":
                        existingUser.setLastName((String) value);
                        break;
                    case "username":
                        existingUser.setUsername((String) value);
                        break;
                    case "password":
                        BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
                        existingUser.setPassword(bc.encode((String) value));
                        break;
                    case "phoneNumber":
                        existingUser.setPhoneNumber((String) value);
                        break;
                }
            });

            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    public void deleteUser(String _id){
        userRepository.deleteUserBy_id(_id);
    }
}
