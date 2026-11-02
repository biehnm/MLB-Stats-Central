CREATE DATABASE IF NOT EXISTS mlb_stats_central;
USE mlb_stats_central;

-- 1. Stadiums
CREATE TABLE IF NOT EXISTS Stadium (
    stadium_id INT AUTO_INCREMENT PRIMARY KEY,
    stadium_name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL
    ) ENGINE=InnoDB;

-- 2. Teams
CREATE TABLE IF NOT EXISTS Team (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(3) NOT NULL UNIQUE
    ) ENGINE=InnoDB;

-- 3. Players
CREATE TABLE IF NOT EXISTS Player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(75) NOT NULL,
    last_name VARCHAR(75) NOT NULL,
    position ENUM('C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH', 'SP', 'RP'),
    jersey_number TINYINT UNSIGNED,
    team_id INT,

    CONSTRAINT fk_player_team
    FOREIGN KEY (team_id)
    REFERENCES Team(team_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

    CONSTRAINT chk_jersey_number
    CHECK (jersey_number BETWEEN 0 AND 99)
    ) ENGINE=InnoDB;

-- 4. Games
CREATE TABLE IF NOT EXISTS Game (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    game_date DATE NOT NULL,
    season_year SMALLINT UNSIGNED NOT NULL,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    stadium_id INT NOT NULL,
    home_score TINYINT UNSIGNED DEFAULT NULL,
    away_score TINYINT UNSIGNED DEFAULT NULL,
    game_status ENUM('Scheduled', 'In_Progress', 'Final', 'Postponed') NOT NULL DEFAULT 'Scheduled',

    CONSTRAINT fk_game_home_team
    FOREIGN KEY (home_team_id)
    REFERENCES Team(team_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

    CONSTRAINT fk_game_away_team
    FOREIGN KEY (away_team_id)
    REFERENCES Team(team_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

    CONSTRAINT fk_game_stadium
    FOREIGN KEY (stadium_id)
    REFERENCES Stadium(stadium_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

    CONSTRAINT chk_different_teams
    CHECK (home_team_id <> away_team_id)
    ) ENGINE=InnoDB;

-- 5. PlayerGameStats
CREATE TABLE IF NOT EXISTS PlayerGameStats (
player_id INT NOT NULL,
    game_id INT NOT NULL,
    at_bats TINYINT UNSIGNED NOT NULL DEFAULT 0,
    hits TINYINT UNSIGNED NOT NULL DEFAULT 0,
    home_runs TINYINT UNSIGNED NOT NULL DEFAULT 0,
    runs_batted_in TINYINT UNSIGNED NOT NULL DEFAULT 0,
    runs_scored TINYINT UNSIGNED NOT NULL DEFAULT 0,
    strikeouts TINYINT UNSIGNED NOT NULL DEFAULT 0,
    walks TINYINT UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (player_id, game_id),

    CONSTRAINT fk_stats_player
    FOREIGN KEY (player_id)
    REFERENCES Player(player_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

    CONSTRAINT fk_stats_game
    FOREIGN KEY (game_id)
    REFERENCES Game(game_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

    CONSTRAINT chk_hits_not_ab
    CHECK (hits <= at_bats),

    CONSTRAINT chk_home_runs_not_hits
    CHECK (home_runs <= hits)
    ) ENGINE=InnoDB;

-- 6. Application Users
CREATE TABLE IF NOT EXISTS `User` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_role ENUM('User', 'Admin') NOT NULL DEFAULT 'User',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;

-- Indexes for performance and foreign key traversals
CREATE INDEX idx_player_team ON Player(team_id);
CREATE INDEX idx_game_date ON Game(game_date);
CREATE INDEX idx_game_home_team ON Game(home_team_id);
CREATE INDEX idx_game_away_team ON Game(away_team_id);
CREATE INDEX idx_stats_game ON PlayerGameStats(game_id);