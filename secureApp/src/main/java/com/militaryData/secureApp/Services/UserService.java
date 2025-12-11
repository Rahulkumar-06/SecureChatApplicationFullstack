package com.militaryData.secureApp.Services;

import com.militaryData.secureApp.Models.entity.Users;
import com.militaryData.secureApp.Repositorys.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService{
    @Autowired
    private UserRepo repo;
    public ResponseEntity<String> UserRegister(Users user) {
        if(repo.existsByUsername(user.getUsername())) {
            return new ResponseEntity<>("Username already exists!", HttpStatus.CONFLICT);
          }
         PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repo.save(user);
        return new ResponseEntity<>("Registered Successfully",HttpStatus.OK);
    }

    public ResponseEntity<List<Users>> GetAllUsers() {
        List<Users> users = repo.findAll();
        return ResponseEntity.ok(users);
    }
    public ResponseEntity<List<Users>> GetAllUsersByRole() {
        List<Users> users = repo.findAll();

        List<Users> soldiers = users.stream()
                .filter(user -> user.getRole().name().equalsIgnoreCase("Soldier"))
                .toList();

        return ResponseEntity.ok(soldiers);
    }


    public Optional<Users> findByUsername(String username){
        return repo.findByUsername(username);
   }

    public ResponseEntity<String> DeleteUser(long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(404).body("User not found");
        }
        repo.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
