
package com.mlb.backend.controller;

import com.mlb.backend.model.Player;
import com.mlb.backend.repository.PlayerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {

    private final PlayerRepository playerRepository;

    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Player getPlayerById(@PathVariable Integer id) {
        return playerRepository.findById(id).orElse(null);
    }
}
