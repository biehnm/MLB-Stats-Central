
package com.mlb.backend.controller;

import com.mlb.backend.model.Game;
import com.mlb.backend.repository.GameRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Integer id) {
        return gameRepository.findById(id).orElse(null);
    }
}

