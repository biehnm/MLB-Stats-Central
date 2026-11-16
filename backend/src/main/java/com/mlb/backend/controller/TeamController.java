
package com.mlb.backend.controller;

import com.mlb.backend.model.Team;
import com.mlb.backend.repository.TeamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamRepository teamRepository;

    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @GetMapping
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @GetMapping("/{id}")
    public Team getTeamById(@PathVariable Integer id) {
        return teamRepository.findById(id).orElse(null);
    }
}
