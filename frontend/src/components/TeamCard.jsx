export default function TeamCard({ team }) {
  return (
    <div className="team-card">
      <h3>{team.teamName}</h3>
      <p className="team-abbreviation">{team.abbreviation}</p>
      <p>{`City: ${team.city}`}</p>
      <p>{`Team ID: ${team.teamId}`}</p>
    </div>
  );
}
