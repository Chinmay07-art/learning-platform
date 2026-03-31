package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<UserData, Integer> {
    UserData findByUsername(String username);
    long countByRole(String role);
    List<UserData> findByRole(String role);
}