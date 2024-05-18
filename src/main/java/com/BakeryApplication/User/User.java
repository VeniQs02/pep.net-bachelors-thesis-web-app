package com.BakeryApplication.User;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "User")
@Data
public class User {
    @Id
    String _id;
    LocalDate creationDate;
    String role;
    String name;
    String email;
    String address;
    String password;
    String phoneNumber;
}

