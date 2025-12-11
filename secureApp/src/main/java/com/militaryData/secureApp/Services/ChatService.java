package com.militaryData.secureApp.Services;

import com.militaryData.secureApp.Models.entity.ChatMessage;
import com.militaryData.secureApp.Repositorys.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatRepo;

    public void saveMessage(String sender, String receiver, String content) {
        ChatMessage message = new ChatMessage(
                sender,
                receiver,
                content,
                LocalDateTime.now()
        );
        chatRepo.save(message);
    }

    public List<ChatMessage> getPrivateChat(String user1, String user2) {
        List<ChatMessage> senderChat = chatRepo.findBySenderAndReceiver(user1,user2);
        List<ChatMessage> receiverChat = chatRepo.findBySenderAndReceiver(user2,user1);

        List<ChatMessage> allMessage = new ArrayList<>();
        allMessage.addAll(senderChat);
        allMessage.addAll(receiverChat);
        allMessage.sort(Comparator.comparing(ChatMessage::getTimestamp));
        return allMessage;
    }

    public ResponseEntity<List<ChatMessage>> GetAllData() {
        return new ResponseEntity<>(chatRepo.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Optional<ChatMessage>> GetById(long id) {
            return new ResponseEntity<>(chatRepo.findById(id),HttpStatus.OK);
    }
}