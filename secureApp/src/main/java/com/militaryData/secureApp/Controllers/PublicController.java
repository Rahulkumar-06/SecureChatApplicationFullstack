package com.militaryData.secureApp.Controllers;

import com.militaryData.secureApp.Models.entity.Weapon;
import com.militaryData.secureApp.Services.WeaponServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicController {
    @Autowired
    private WeaponServiceImpl weaponService;

    @GetMapping("/weapons")
    public ResponseEntity<List<Weapon>> getAllWeapons() {
        return ResponseEntity.ok(weaponService.getAllWeapons());
    }
}
