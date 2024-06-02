package com.BakeryApplication.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class UserService {

    private String SECRET_KEY_STRING;
    private SecretKey SECRET_KEY;

    @Autowired
    private UserRepository userRepository;


    UserService(){
        SECRET_KEY_STRING = "aNIABNCIUsaddasdB123AFS1293871298378AJKSNDIJAISBDJasdasd";
        SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes(StandardCharsets.UTF_8));
    }

    public List<User> allUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String _id){
        return userRepository.findById(_id);
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public void addUserApplyModifications(User user){
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

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getName())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Token valid for 1 hour
                .signWith(SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token);
            return true;
        }  catch(SignatureException sigE){
            System.err.println(sigE.getMessage());
            return false;
        }
        catch (Exception e) {
            return false;
        }
    }

//    public Claims extractAllClaims(String token) {
//        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
//    }

//    public String extractUsername(String token) {
//        return Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload().getSubject();
//    }

}
