package com.BakeryApplication.Message;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Message")
public class Message {
    @Id
    String _id;
    String customerName;
    String customerEmail;
    String message;
}
