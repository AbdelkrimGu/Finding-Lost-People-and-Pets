package com.example.userservice.repo;

import com.example.userservice.models.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationRepo extends JpaRepository<ConfirmationToken,Long> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);

}
