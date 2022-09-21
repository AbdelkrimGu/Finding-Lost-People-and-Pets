package com.example.userservice.service;

import com.example.userservice.models.User;
import com.example.userservice.models.Role;

import java.util.List;

/**
 * @author Get Arrays (https://www.getarrays.io/)
 * @version 1.0
 * @since 7/10/2021
 */
public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String email);
    User getUserById(Long id);
    String deleteUser(String email);
    List<User>getUsers();
    void saveChanges(User user);
}
