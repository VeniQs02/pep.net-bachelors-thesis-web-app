package com.BakeryApplication.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    List<Message> getAllMessages(){
        return messageRepository.findAll();
    }
    Optional<Message> getMessageById(String _id){
        return messageRepository.findById(_id);
    }
    Message addOrder(Message message){
        return messageRepository.save(message);
    }
    void deleteMessageById(String _id){
        messageRepository.deleteById(_id);
    }

}
