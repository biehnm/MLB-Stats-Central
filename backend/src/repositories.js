const playerSelect = `
  SELECT player_id AS playerId, first_name AS firstName, last_name AS lastName,
         position, jersey_number AS jerseyNumber, team_id AS teamId
  FROM Player
`;

const teamSelect = `
  SELECT team_id AS teamId, team_name AS teamName, city, abbreviation
  FROM Team
`;

const gameSelect = `
  SELECT game_id AS gameId, game_date AS gameDate, season_year AS seasonYear,
         home_team_id AS homeTeamId, away_team_id AS awayTeamId, stadium_id AS stadiumId,
         home_score AS homeScore, away_score AS awayScore, game_status AS gameStatus
  FROM Game
`;

function createRepository(db, select, idColumn) {
  return {
    async findAll() {
      const [rows] = await db.execute(`${select} ORDER BY ${idColumn}`);
      return rows;
    },

    async findById(id) {
      const [[row]] = await db.execute(`${select} WHERE ${idColumn} = ?`, [id]);
      return row;
    },
  };
}

export function createRepositories(db) {
  return {
    players: createRepository(db, playerSelect, 'player_id'),
    teams: createRepository(db, teamSelect, 'team_id'),
    games: createRepository(db, gameSelect, 'game_id'),
  };
}
