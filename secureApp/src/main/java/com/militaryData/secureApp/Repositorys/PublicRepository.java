package com.militaryData.secureApp.Repositorys;

import com.militaryData.secureApp.Models.entity.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicRepository extends JpaRepository<Weapon,Long>{

}
