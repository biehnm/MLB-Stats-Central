export default function GameRow({ game, teamNames }) {
  const score = game.homeScore == null || game.awayScore == null
    ? 'Not available'
    : `${game.homeScore} - ${game.awayScore}`;

  return (
    <tr>
      <td>{game.gameId}</td>
      <td>{game.gameDate}</td>
      <td>{teamNames.get(game.homeTeamId) || 'Unknown Team'}</td>
      <td>{teamNames.get(game.awayTeamId) || 'Unknown Team'}</td>
      <td>{score}</td>
      <td>{game.gameStatus}</td>
    </tr>
  );
}
