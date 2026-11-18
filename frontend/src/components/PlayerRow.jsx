export default function PlayerRow({ player, teamName }) {
  return (
    <tr>
      <td>{player.playerId}</td>
      <td>{`${player.firstName} ${player.lastName}`}</td>
      <td>{player.position ?? '—'}</td>
      <td>{player.jerseyNumber ?? '—'}</td>
      <td>{teamName ?? (player.teamId == null ? 'Unassigned' : 'Unknown team')}</td>
    </tr>
  );
}
