
package com.mlb.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Integer gameId;

    @Column(name = "game_date")
    private LocalDate gameDate;

    @Column(name = "season_year")
    private Integer seasonYear;

    @Column(name = "home_team_id")
    private Integer homeTeamId;

    @Column(name = "away_team_id")
    private Integer awayTeamId;

    @Column(name = "stadium_id")
    private Integer stadiumId;

    @Column(name = "home_score")
    private Integer homeScore;

    @Column(name = "away_score")
    private Integer awayScore;

    @Column(name = "game_status")
    private String gameStatus;

    public Game() {
    }

    public Integer getGameId() {
        return gameId;
    }

    public LocalDate getGameDate() {
        return gameDate;
    }

    public Integer getSeasonYear() {
        return seasonYear;
    }

    public Integer getHomeTeamId() {
        return homeTeamId;
    }

    public Integer getAwayTeamId() {
        return awayTeamId;
    }

    public Integer getStadiumId() {
        return stadiumId;
    }

    public Integer getHomeScore() {
        return homeScore;
    }

    public Integer getAwayScore() {
        return awayScore;
    }

    public String getGameStatus() {
        return gameStatus;
    }
}
