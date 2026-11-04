-- Synthetic 2026 fixtures for query practice.
-- Run after schema.sql on an empty development database.
-- IDs are fixed so the game_id = 1 example in queries.sql returns rows.
USE mlb_stats_central;

START TRANSACTION;

INSERT INTO Stadium (stadium_id, stadium_name, city, state) VALUES
    (1, 'Wrigley Field', 'Chicago', 'IL'),
    (2, 'Busch Stadium', 'St. Louis', 'MO'),
    (3, 'Dodger Stadium', 'Los Angeles', 'CA'),
    (4, 'Oracle Park', 'San Francisco', 'CA');

INSERT INTO Team (team_id, team_name, city, abbreviation) VALUES
    (1, 'Chicago Cubs', 'Chicago', 'CHC'),
    (2, 'St. Louis Cardinals', 'St. Louis', 'STL'),
    (3, 'Los Angeles Dodgers', 'Los Angeles', 'LAD'),
    (4, 'San Francisco Giants', 'San Francisco', 'SF');

INSERT INTO Player (player_id, first_name, last_name, position, jersey_number, team_id) VALUES
    (1, 'Eli', 'Navarro', 'SS', 7, 1),
    (2, 'Marcus', 'Reed', 'RF', 24, 1),
    (3, 'Jonah', 'Ellis', 'CF', 12, 2),
    (4, 'Andre', 'Mercer', '1B', 35, 2),
    (5, 'Mateo', 'Vega', 'DH', 18, 3),
    (6, 'Caleb', 'Park', '2B', 4, 3),
    (7, 'Lucas', 'Bennett', 'C', 28, 4),
    (8, 'Nico', 'Santos', '3B', 13, 4);

INSERT INTO Game
    (game_id, game_date, season_year, home_team_id, away_team_id, stadium_id,
     home_score, away_score, game_status)
VALUES
    (1, '2026-04-03', 2026, 1, 2, 1, 5, 3, 'Final'),
    (2, '2026-04-03', 2026, 3, 4, 3, 2, 4, 'Final'),
    (3, '2026-04-04', 2026, 1, 2, 1, 1, 6, 'Final'),
    (4, '2026-04-10', 2026, 2, 1, 2, NULL, NULL, 'Postponed'),
    (5, '2026-04-10', 2026, 4, 3, 4, NULL, NULL, 'Scheduled');

-- Selected batting lines for completed games.
INSERT INTO PlayerGameStats
    (player_id, game_id, at_bats, hits, home_runs, runs_batted_in, runs_scored,
     strikeouts, walks)
VALUES
    (1, 1, 4, 2, 0, 1, 1, 0, 1),
    (2, 1, 4, 2, 1, 2, 2, 1, 0),
    (3, 1, 4, 1, 0, 0, 1, 1, 0),
    (4, 1, 4, 1, 1, 2, 1, 2, 0),
    (5, 2, 4, 1, 1, 1, 1, 1, 0),
    (6, 2, 3, 0, 0, 0, 0, 2, 1),
    (7, 2, 4, 2, 1, 2, 1, 1, 0),
    (8, 2, 4, 2, 0, 1, 1, 0, 0),
    (1, 3, 4, 1, 0, 0, 0, 1, 0),
    (2, 3, 4, 1, 1, 1, 1, 2, 0),
    (3, 3, 5, 3, 0, 1, 2, 0, 0),
    (4, 3, 4, 2, 1, 3, 1, 1, 1);

-- Fixture account for SQL queries. The placeholder is not a login credential.
INSERT INTO `User` (user_id, username, email, password_hash) VALUES
    (1, 'seed_viewer', 'seed.viewer@example.invalid', 'disabled-seed-account');

COMMIT;
