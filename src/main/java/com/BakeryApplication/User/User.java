package com.BakeryApplication.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
@Data
@AllArgsConstructor
public class User {
    @Id
    String _id;
    String firstName;
    String lastName;
    String username;
    String password;
    String phoneNumber;
    String creationDate;
    String role;
}
