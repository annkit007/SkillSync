package com.skillsync.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skillsync.backend.model.Goal;

public interface GoalRepository extends JpaRepository<Goal, Long> {}
