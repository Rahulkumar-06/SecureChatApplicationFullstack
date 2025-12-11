package com.militaryData.secureApp.Services;

import com.militaryData.secureApp.Models.entity.Weapon;
import com.militaryData.secureApp.Repositorys.PublicRepository;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeaponServiceImpl {

    private final PublicRepository publicRepository;

    public Weapon addWeapon(String name, String description, MultipartFile image) throws IOException {
        Weapon weapon = new Weapon();
        weapon.setWeaponName(name);
        weapon.setDescription(description);

        if (image != null && !image.isEmpty()) {
            weapon.setPicture(image.getBytes());
        }

        return publicRepository.save(weapon);
    }

    public Weapon updateWeapon(Long id, String name, String description, MultipartFile image) throws IOException {
        Weapon weapon = publicRepository.findById(id).orElse(null);
        if (weapon == null) return null;

        weapon.setWeaponName(name);
        weapon.setDescription(description);

        if (image != null && !image.isEmpty()) {
            weapon.setPicture(image.getBytes());
        }

        return publicRepository.save(weapon);
    }

    public boolean deleteWeapon(Long id) {
        if (!publicRepository.existsById(id)) return false;

        publicRepository.deleteById(id);
        return true;
    }

    public List<Weapon> getAllWeapons() {
        return publicRepository.findAll();
    }

    public Weapon getWeaponById(Long id) {
        return publicRepository.findById(id).orElse(null);
    }
}
