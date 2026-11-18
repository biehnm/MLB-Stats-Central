import { useState } from 'react';
import { getPlayersWithTeams } from '../api.js';
import DataTable from '../components/DataTable.jsx';
import FilterBar from '../components/FilterBar.jsx';
import FilterSelect from '../components/FilterSelect.jsx';
import PlayerRow from '../components/PlayerRow.jsx';
import ResultsSection from '../components/ResultsSection.jsx';
import TeamFilter from '../components/TeamFilter.jsx';
import useRequest from '../hooks/useRequest.js';

const columns = ['Player ID', 'Name', 'Position', 'Jersey #', 'Team'];
const loading = 'Loading players...';

export default function PlayersPage() {
  const { status, data } = useRequest(getPlayersWithTeams);
  const [name, setName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(
    () => new URLSearchParams(window.location.search).get('team') ?? ''
  );
  const [position, setPosition] = useState('');

  const players = data?.rows ?? [];
  const teams = data?.teams ?? [];
  const teamNames = new Map(teams.map(team => [String(team.teamId), team.teamName]));
  const team = teamNames.has(selectedTeam) ? selectedTeam : '';
  const positions = [...new Set(players.map(player => player.position).filter(Boolean))]
    .sort()
    .map(value => ({ value, label: value }));
  const search = name.trim().toLowerCase();
  const matches = players.filter(player =>
    `${player.firstName} ${player.lastName}`.toLowerCase().includes(search) &&
    (!team || String(player.teamId) === team) &&
    (!position || player.position === position)
  );

  function changeTeam(value) {
    setSelectedTeam(value);
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('team', value);
    } else {
      url.searchParams.delete('team');
    }
    window.history.replaceState(window.history.state, '', url);
  }

  function clearFilters() {
    setName('');
    changeTeam('');
    setPosition('');
  }

  const count = { loading, success: `Showing ${matches.length} of ${players.length} players` }[status];
  const message = {
    loading,
    error: 'Unable to load player data.',
    success: matches.length === 0 ? 'No players match these filters.' : undefined,
  }[status];

  return (
    <ResultsSection
      title="Player Roster"
      countId="player-count"
      count={count}
      error={status === 'error' && 'Could not load players. Please try again.'}
      filters={status === 'success' && (
        <FilterBar onClear={clearFilters} canClear={Boolean(name || team || position)}>
          <label className="filter-field">
            Search by name
            <input type="search" value={name} onChange={event => setName(event.target.value)} />
          </label>
          <TeamFilter teams={teams} value={team} onChange={changeTeam} />
          <FilterSelect
            label="Position"
            allLabel="All positions"
            options={positions}
            value={position}
            onChange={setPosition}
          />
        </FilterBar>
      )}
    >
      <DataTable columns={columns} bodyId="players-table" message={message}>
        {matches.map(player => (
          <PlayerRow
            key={player.playerId}
            player={player}
            teamName={teamNames.get(String(player.teamId))}
          />
        ))}
      </DataTable>
    </ResultsSection>
  );
}
