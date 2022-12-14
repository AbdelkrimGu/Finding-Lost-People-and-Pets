package com.example.userservice.repo;

import com.example.userservice.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Get Arrays (https://www.getarrays.io/)
 * @version 1.0
 * @since 7/10/2021
 */
public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
