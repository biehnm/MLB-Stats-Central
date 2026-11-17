export default function PlayerRow({ player }) {
  return (
    <tr>
      <td>{player.playerId}</td>
      <td>{player.firstName}</td>
      <td>{player.lastName}</td>
      <td>{player.position ?? 'null'}</td>
      <td>{player.jerseyNumber}</td>
      <td>{player.teamId}</td>
    </tr>
  );
}
