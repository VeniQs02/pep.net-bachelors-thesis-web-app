package com.BakeryApplication.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

}
