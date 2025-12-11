package com.militaryData.secureApp.Models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Roles role;
    public enum Roles {
        Admin,Soldier
    }
}
