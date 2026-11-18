import { useState } from 'react';
import { getGamesWithTeams } from '../api.js';
import DataTable from '../components/DataTable.jsx';
import FilterBar from '../components/FilterBar.jsx';
import FilterSelect from '../components/FilterSelect.jsx';
import GameRow from '../components/GameRow.jsx';
import ResultsSection from '../components/ResultsSection.jsx';
import TeamFilter from '../components/TeamFilter.jsx';
import { formatGameStatus } from '../gameStatus.js';
import useRequest from '../hooks/useRequest.js';

const columns = ['Game ID', 'Date', 'Home Team', 'Away Team', 'Score', 'Status'];
const loading = 'Loading games...';

export default function GamesPage() {
  const { status, data } = useRequest(getGamesWithTeams);
  const [team, setTeam] = useState('');
  const [gameStatus, setGameStatus] = useState('');

  const games = data?.rows ?? [];
  const teams = data?.teams ?? [];
  const teamNames = new Map(teams.map(team => [team.teamId, team.teamName]));
  const statuses = [...new Set(games.map(game => game.gameStatus))]
    .sort()
    .map(value => ({ value, label: formatGameStatus(value) }));
  const matches = games.filter(game =>
    (!team || String(game.homeTeamId) === team || String(game.awayTeamId) === team) &&
    (!gameStatus || game.gameStatus === gameStatus)
  );

  function clearFilters() {
    setTeam('');
    setGameStatus('');
  }

  const count = { loading, success: `Showing ${matches.length} of ${games.length} games` }[status];
  const message = {
    loading,
    error: 'Unable to load game data.',
    success: matches.length === 0 ? 'No games match these filters.' : undefined,
  }[status];

  return (
    <ResultsSection
      title="Game Schedule"
      countId="game-count"
      count={count}
      error={status === 'error' && 'Could not load games. Please try again.'}
      filters={status === 'success' && (
        <FilterBar onClear={clearFilters} canClear={Boolean(team || gameStatus)}>
          <TeamFilter teams={teams} value={team} onChange={setTeam} />
          <FilterSelect
            label="Status"
            allLabel="All statuses"
            options={statuses}
            value={gameStatus}
            onChange={setGameStatus}
          />
        </FilterBar>
      )}
    >
      <DataTable columns={columns} bodyId="games-table" message={message}>
        {matches.map(game => <GameRow key={game.gameId} game={game} teamNames={teamNames} />)}
      </DataTable>
    </ResultsSection>
  );
}
