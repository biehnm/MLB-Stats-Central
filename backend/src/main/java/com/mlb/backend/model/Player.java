
package com.mlb.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private Integer playerId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "position")
    private String position;

    @Column(name = "jersey_number")
    private Integer jerseyNumber;

    @Column(name = "team_id")
    private Integer teamId;

    public Player() {
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPosition() {
        return position;
    }

    public Integer getJerseyNumber() {
        return jerseyNumber;
    }

    public Integer getTeamId() {
        return teamId;
    }
}
