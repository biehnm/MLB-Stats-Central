async function getCollection(resource, signal) {
  const response = await fetch(`/api/${resource}`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to retrieve ${resource}.`);
  }
  return response.json();
}

export const getPlayers = signal => getCollection('players', signal);
export const getTeams = signal => getCollection('teams', signal);

export async function getGamesWithTeams(signal) {
  const [games, teams] = await Promise.all([
    getCollection('games', signal),
    getTeams(signal),
  ]);

  return {
    games,
    teamNames: new Map(teams.map(team => [team.teamId, team.teamName])),
  };
}
