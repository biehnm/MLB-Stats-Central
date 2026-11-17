import { getGamesWithTeams } from '../api.js';
import DataTable from '../components/DataTable.jsx';
import GameRow from '../components/GameRow.jsx';
import ResultsSection from '../components/ResultsSection.jsx';
import Welcome from '../components/Welcome.jsx';
import useRequest from '../hooks/useRequest.js';

const columns = ['Game ID', 'Date', 'Home Team', 'Away Team', 'Score', 'Status'];
const loading = 'Loading games...';

export default function GamesPage() {
  const { status, data } = useRequest(getGamesWithTeams);
  const games = data?.games ?? [];
  const count = { loading, success: `Total Games: ${games.length}` }[status];
  const message = {
    loading,
    error: loading,
    success: games.length === 0 ? 'No games found.' : undefined,
  }[status];

  return (
    <>
      <Welcome title="Game Schedule">View game results and schedules from our mock database.</Welcome>
      <ResultsSection
        title="All Games"
        countId="game-count"
        count={count}
        error={status === 'error' && 'Could not load games. Please try again.'}
      >
        <DataTable columns={columns} bodyId="games-table" message={message}>
          {games.map(game => <GameRow key={game.gameId} game={game} teamNames={data.teamNames} />)}
        </DataTable>
      </ResultsSection>
    </>
  );
}
