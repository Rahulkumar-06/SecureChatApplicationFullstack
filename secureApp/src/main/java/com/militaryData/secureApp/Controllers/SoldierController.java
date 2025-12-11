package com.militaryData.secureApp.Controllers;

import com.militaryData.secureApp.Models.entity.ChatMessage;
import com.militaryData.secureApp.Models.entity.Users;
import com.militaryData.secureApp.Services.ChatService;
import com.militaryData.secureApp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/soldier")
public class SoldierController {

    @Autowired
    private ChatService chatService;


    @GetMapping("/privetchat")
    public ResponseEntity<List<ChatMessage>> getPrivateChat(
            @RequestParam String sender,
            @RequestParam String receiver
    ){
        List<ChatMessage> messages = chatService.getPrivateChat(sender, receiver);
        return ResponseEntity.ok(messages);
    }
    @Autowired
    private UserService userService;

    @GetMapping("/allsoldier")
      public ResponseEntity<List<Users>> GetAllUsersByRole(){
        return userService.GetAllUsersByRole();
    }

}