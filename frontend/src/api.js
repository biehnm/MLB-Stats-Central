async function getCollection(resource, signal) {
  const response = await fetch(`/api/${resource}`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to retrieve ${resource}.`);
  }
  return response.json();
}

export const getTeams = signal => getCollection('teams', signal);

async function getCollectionWithTeams(resource, signal) {
  const [rows, teams] = await Promise.all([
    getCollection(resource, signal),
    getTeams(signal),
  ]);

  return { rows, teams };
}

export const getPlayersWithTeams = signal => getCollectionWithTeams('players', signal);
export const getGamesWithTeams = signal => getCollectionWithTeams('games', signal);
