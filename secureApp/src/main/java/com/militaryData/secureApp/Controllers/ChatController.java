package com.militaryData.secureApp.Controllers;

import com.militaryData.secureApp.Models.dto.ChatMessageDTO;
import com.militaryData.secureApp.Services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessageDTO msg,
                            Authentication authentication) {

        String sender = authentication.getName();

        chatService.saveMessage(sender, msg.getReceiver(), msg.getContent());

        template.convertAndSendToUser(
                msg.getReceiver(),
                "/queue/messages",
                msg
        );
    }
}
