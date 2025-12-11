package com.militaryData.secureApp.Models.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chatId;

    private String sender;
    private String receiver;
    private String content;
    private String timestamp;

}
