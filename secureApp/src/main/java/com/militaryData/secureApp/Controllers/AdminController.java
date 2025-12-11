package com.militaryData.secureApp.Controllers;


import com.militaryData.secureApp.Models.entity.ChatMessage;
import com.militaryData.secureApp.Models.entity.Users;
import com.militaryData.secureApp.Models.entity.Weapon;
import com.militaryData.secureApp.Services.ChatService;
import com.militaryData.secureApp.Services.UserService;
import com.militaryData.secureApp.Services.WeaponServiceImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private WeaponServiceImpl weaponService;

    @PostMapping("/addweapon")
    public ResponseEntity<?> addWeapon(
            @RequestParam String weaponName,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile picture
    ) {
        try {
            Weapon saved = weaponService.addWeapon(weaponName, description, picture);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding weapon");
        }
    }

    @PutMapping("/updateweapon/{id}")
    public ResponseEntity<?> updateWeapon(
            @PathVariable Long id,
            @RequestParam String weaponName,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile picture
    ) {
        try {
            Weapon updated = weaponService.updateWeapon(id, weaponName, description, picture);
            if (updated == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating weapon");
        }
    }

    @DeleteMapping("/deleteweapon/{id}")
    public ResponseEntity<?> deleteWeapon(@PathVariable Long id) {
        boolean deleted = weaponService.deleteWeapon(id);
        if (!deleted) return ResponseEntity.notFound().build();

        return ResponseEntity.ok("Weapon deleted successfully");
    }

    @GetMapping("/weapon/{id}")
    public ResponseEntity<?> getWeaponById(@PathVariable Long id) {
        Weapon weapon = weaponService.getWeaponById(id);
        if (weapon == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(weapon);
    }

    @Autowired
    private ChatService chatService;

    @GetMapping("/getprivetchat")
    public ResponseEntity<List<ChatMessage>> getPrivateChat(
            @RequestParam String user1,
            @RequestParam String user2
    ) {
        List<ChatMessage> messages = chatService.getPrivateChat(user1, user2);
        return ResponseEntity.ok(messages); // 200 OK
    }

    @GetMapping("/getallchat")
    public ResponseEntity<?> GetAllChat(){
        return chatService.GetAllData();
    }

    @GetMapping("/getchat/{id}")
    public ResponseEntity<?> GetChatById(@PathVariable long id){
           return chatService.GetById(id);
    }
    @Autowired
    private UserService userService;
    @GetMapping("/getallusers")
    public ResponseEntity<List<Users>> GetAllUsers(){
        return userService.GetAllUsers();
    }
    @PostMapping("/userregister")
    public ResponseEntity<?> UserRegister(@RequestBody Users user){
        return userService.UserRegister(user);
    }
    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<?> DeleteUser(@PathVariable long id){
        return userService.DeleteUser(id);
    }
}
