package com.BakeryApplication.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy MM d, H:mm");
        String formattedDate = sdf.format(new Date());
        user.setCreationDate(formattedDate);
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
                        existingUser.setCreationDate((String) value);
                        break;
                    case "role":
                        existingUser.setRole((String) value);
                        break;
                    case "name":
                        existingUser.setName((String) value);
                        break;
                    case "email":
                        existingUser.setEmail((String) value);
                        break;
                    case "address":
                        existingUser.setAddress((String) value);
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

    public User getUserByName(String username){
        return userRepository.getUserByName(username);
    }

}
