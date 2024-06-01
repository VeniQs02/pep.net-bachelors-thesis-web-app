package com.BakeryApplication.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.rsocket.RSocketSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/{_id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable String _id){
        return new ResponseEntity<>(userService.getUserById(_id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        userService.addUserApplyModifcations(user);
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{_id}")
    public ResponseEntity<User> updateUser(@RequestBody Map<String, Object> updates, @PathVariable String _id) {
        User updatedUser = userService.updateUser(_id, updates);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{_id}")
    public ResponseEntity<?> deleteUser(@PathVariable String _id){
        userService.deleteUser(_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials){
        BCryptPasswordEncoder bc = new BCryptPasswordEncoder();

        String name = credentials.get("name");
        String password = credentials.get("password");

        User user = userService.getUserByName(name);

        if(user != null){
            if(bc.matches(password, user.password)){
                return new ResponseEntity<>(user, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Wrong credentials!", HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity<>("User not found!", HttpStatus.BAD_REQUEST);
        }
    }

}
