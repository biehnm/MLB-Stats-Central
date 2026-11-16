
package com.mlb.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Integer teamId;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "city")
    private String city;

    @Column(name = "abbreviation")
    private String abbreviation;

    public Team() {
    }

    public Integer getTeamId() {
        return teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public String getCity() {
        return city;
    }

    public String getAbbreviation() {
        return abbreviation;
    }
}
