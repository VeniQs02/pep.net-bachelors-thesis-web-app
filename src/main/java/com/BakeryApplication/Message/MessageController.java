package com.BakeryApplication.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping()
    public ResponseEntity<List<Message>> getAllMessages(){
        return new ResponseEntity<>(messageService.getAllMessages(), HttpStatus.OK);
    }

    @GetMapping("/{_id}")
    public ResponseEntity<Optional<Message>> getMessageById(@PathVariable String _id){
        return new ResponseEntity<>(messageService.getMessageById( _id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Message> addMessage(@RequestBody Message message){
        messageService.applyModifications(message);
        Message newMessage = messageService.addMessage(message);
        return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{_id}")
    public ResponseEntity<?> deleteMessage(@PathVariable String _id){
        messageService.deleteMessageById(_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
