import { getPlayers } from '../api.js';
import DataTable from '../components/DataTable.jsx';
import PlayerRow from '../components/PlayerRow.jsx';
import ResultsSection from '../components/ResultsSection.jsx';
import Welcome from '../components/Welcome.jsx';
import useRequest from '../hooks/useRequest.js';

const columns = ['Player ID', 'First Name', 'Last Name', 'Position', 'Jersey Number', 'Team ID'];
const loading = 'Loading players...';

export default function PlayersPage() {
  const { status, data: players = [] } = useRequest(getPlayers);
  const count = { loading, success: `Total Players: ${players.length}` }[status];
  const message = {
    loading,
    error: 'Unable to load player data.',
    success: players.length === 0 ? 'No players found.' : undefined,
  }[status];

  return (
    <>
      <Welcome title="Player Statistics">Browse players from our mock baseball database.</Welcome>
      <ResultsSection
        title="All Players"
        countId="player-count"
        count={count}
        error={status === 'error' && 'Could not load players. Please try again.'}
      >
        <DataTable columns={columns} bodyId="players-table" message={message}>
          {players.map(player => <PlayerRow key={player.playerId} player={player} />)}
        </DataTable>
      </ResultsSection>
    </>
  );
}
