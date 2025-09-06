package com.skillsync.backend.controller;

import com.skillsync.backend.model.Goal;
import com.skillsync.backend.repository.GoalRepository;
import com.skillsync.backend.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")
public class GoalController {

    @Autowired
    private OpenAIService openAIService; // Only one instance

    @Autowired
    private GoalRepository goalRepository;

    // 1. Get all goals
    @GetMapping
    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    // 2. Create new goal
    @PostMapping
    public Goal createGoal(@RequestBody Goal goal) {
        return goalRepository.save(goal);
    }

    // 3. Get goal by ID
    @GetMapping("/{id}")
    public ResponseEntity<Goal> getGoalById(@PathVariable Long id) {
        Optional<Goal> goal = goalRepository.findById(id);
        return goal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. Update goal by ID
    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long id, @RequestBody Goal updatedGoal) {
        Optional<Goal> optionalGoal = goalRepository.findById(id);
        if (optionalGoal.isPresent()) {
            Goal goal = optionalGoal.get();
            goal.setTitle(updatedGoal.getTitle());
            goal.setDescription(updatedGoal.getDescription());
            return ResponseEntity.ok(goalRepository.save(goal));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. Delete goal by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        if (goalRepository.existsById(id)) {
            goalRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   

@GetMapping("/ai-response")
public ResponseEntity<String> getAIResponse(@RequestParam("prompt") String prompt) {
    try {
        String aiText = openAIService.generateText(prompt);
        return ResponseEntity.ok(aiText);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error calling AI: " + e.getMessage());
    }
}


}
