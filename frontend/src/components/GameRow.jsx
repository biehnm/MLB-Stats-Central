import { formatGameStatus } from '../gameStatus.js';

const gameDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export default function GameRow({ game, teamNames }) {
  const score = game.homeScore == null || game.awayScore == null
    ? '—'
    : `${game.homeScore} - ${game.awayScore}`;

  return (
    <tr>
      <td>{game.gameId}</td>
      <td><time dateTime={game.gameDate}>{gameDateFormat.format(new Date(game.gameDate))}</time></td>
      <td>{teamNames.get(game.homeTeamId) ?? 'Unknown team'}</td>
      <td>{teamNames.get(game.awayTeamId) ?? 'Unknown team'}</td>
      <td>{score}</td>
      <td>{formatGameStatus(game.gameStatus)}</td>
    </tr>
  );
}
