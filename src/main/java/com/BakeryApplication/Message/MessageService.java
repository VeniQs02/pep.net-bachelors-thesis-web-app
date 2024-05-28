package com.BakeryApplication.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.text.SimpleDateFormat;
import java.util.Date;
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
    Message addMessage(Message message){
        return messageRepository.save(message);
    }
    public void applyModifications(Message message){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy MM d, H:mm");
        String formattedDate = sdf.format(new Date());
        message.setMessageCreationDate(formattedDate);
    }
    void deleteMessageById(String _id){
        messageRepository.deleteById(_id);
    }

}
