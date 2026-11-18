export default function TeamCard({ team }) {
  return (
    <div className="team-card">
      <h3>{team.teamName}</h3>
      <p className="team-abbreviation">{team.abbreviation}</p>
      <p>{`City: ${team.city}`}</p>
      <a
        className="roster-link"
        href={`/?team=${encodeURIComponent(team.teamId)}`}
        aria-label={`View roster for ${team.teamName}`}
      >
        View roster
      </a>
    </div>
  );
}
