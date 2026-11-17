import { getTeams } from '../api.js';
import ResultsSection from '../components/ResultsSection.jsx';
import TeamCard from '../components/TeamCard.jsx';
import Welcome from '../components/Welcome.jsx';
import useRequest from '../hooks/useRequest.js';

export default function TeamsPage() {
  const { status, data: teams = [] } = useRequest(getTeams);
  const count = { loading: 'Loading teams...', success: `Total Teams: ${teams.length}` }[status];

  return (
    <>
      <Welcome title="MLB Teams">Browse all teams in our mock baseball database.</Welcome>
      <ResultsSection
        title="All Teams"
        countId="team-count"
        count={count}
        error={status === 'error' && 'Could not load teams. Please try again.'}
      >
        <div id="teams-container" className="teams-grid">
          {teams.map(team => <TeamCard key={team.teamId} team={team} />)}
          {status === 'success' && teams.length === 0 && 'No teams found.'}
        </div>
      </ResultsSection>
    </>
  );
}
