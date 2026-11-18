import FilterSelect from './FilterSelect.jsx';

export default function TeamFilter({ teams, value, onChange }) {
  const options = teams.map(team => ({ value: String(team.teamId), label: team.teamName }));

  return (
    <FilterSelect
      label="Team"
      allLabel="All teams"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}
