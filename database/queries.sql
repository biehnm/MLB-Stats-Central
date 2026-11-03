-- Query 1: Display all players and their teams
-- Uses JOIN to connect players with their teams.

SELECT
    Player.first_name,
    Player.last_name,
    Player.position,
    Team.team_name
FROM Player
    JOIN Team
    ON Player.team_id = Team.team_id
ORDER BY Team.team_name;

-- Query 2: Display all games and their results
-- Shows the home team, away team, and final score.

SELECT
    Game.game_date,
    HomeTeam.team_name AS home_team,
    Game.home_score,
    AwayTeam.team_name AS away_team,
    Game.away_score
FROM Game
    JOIN Team AS HomeTeam
    ON Game.home_team_id = HomeTeam.team_id
    JOIN Team AS AwayTeam
    ON Game.away_team_id = AwayTeam.team_id
ORDER BY Game.game_date;

-- Query 3: Display player statistics for a specific game
-- Change the game_id to view a different game.

SELECT
    Player.first_name,
    Player.last_name,
    PlayerGameStats.hits,
    PlayerGameStats.home_runs,
    PlayerGameStats.runs_batted_in
FROM PlayerGameStats
    JOIN Player
    ON PlayerGameStats.player_id = Player.player_id
WHERE PlayerGameStats.game_id = 1;