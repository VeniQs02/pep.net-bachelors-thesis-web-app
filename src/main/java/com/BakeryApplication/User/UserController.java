package com.BakeryApplication.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
        userService.addUserApplyModifications(user);
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
//        System.out.println("Credentials acquired");


        User user = userService.getUserByName(name);
//        System.out.println("User acquired");
        if(user != null){
//            System.out.println("User exists");
            if(bc.matches(password, user.getPassword())){
//                System.out.println("Passwords match");
                String token = userService.generateToken(user);
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
//                System.out.println("Token generated \n\n");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else{
                System.out.println("Passwords do not match\n\n");
                return new ResponseEntity<>("Wrong credentials!", HttpStatus.UNAUTHORIZED);
            }
        }else{
            System.out.println("User doesnt exist\n\n");
            return new ResponseEntity<>("User not found!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        if(token!=null){
            if(userService.validateToken(token)){
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else{
                System.out.println("Token not authorized");
                return new ResponseEntity<>(false, HttpStatus.NOT_ACCEPTABLE);
            }
        }else{
            System.out.println("Token not found");
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
