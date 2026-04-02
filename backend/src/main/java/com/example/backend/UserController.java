package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class UserController {

    @Autowired
    private UserRepository repo;

    @GetMapping("/")
    public String home() {
        return "Java API is working";
    }

    @PostMapping("/register")
    public String register(@RequestBody UserData user) {
        try {
            UserData oldUser = repo.findByUsername(user.getUsername());

            if (oldUser != null) {
                return "Username already exists";
            }

            repo.save(user);
            return "User registered successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody UserData user) {
        try {
            UserData oldUser = repo.findByUsername(user.getUsername());

            if (oldUser == null) {
                return new LoginResponse(0, null, null, "User not found");
            }

            if (oldUser.getPassword().equals(user.getPassword())) {
                return new LoginResponse(
                        oldUser.getId(),
                        oldUser.getUsername(),
                        oldUser.getRole(),
                        "Login successful"
                );
            } else {
                return new LoginResponse(0, null, null, "Invalid password");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new LoginResponse(0, null, null, "Login error");
        }
    }

    @GetMapping("/students/count")
    public long getStudentCount() {
        return repo.countByRole("student");
    }

    @GetMapping("/tutors/count")
    public long getTutorCount() {
        return repo.countByRole("tutor");
    }

    @GetMapping("/students")
    public List<UserData> getStudents() {
        return repo.findByRole("student");
    }

    @GetMapping("/tutors")
    public List<UserData> getTutors() {
        return repo.findByRole("tutor");
    }
}