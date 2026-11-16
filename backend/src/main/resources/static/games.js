
const API_URL = "/api/games";
const TEAMS_API_URL = "/api/teams";

async function loadGames() {
    const table = document.getElementById("games-table");
    const count = document.getElementById("game-count");
    const error = document.getElementById("error-message");

    try {
        const [gamesResponse, teamsResponse] = await Promise.all([
            fetch(API_URL),
            fetch(TEAMS_API_URL)
        ]);

        if (!gamesResponse.ok || !teamsResponse.ok) {
            throw new Error("Failed to retrieve game data.");
        }

        const games = await gamesResponse.json();
        const teams = await teamsResponse.json();

        const teamNames = {};

        teams.forEach(team => {
            teamNames[team.teamId] = team.teamName;
        });

        table.innerHTML = "";
        count.textContent = `Total Games: ${games.length}`;

        games.forEach(game => {
            const row = document.createElement("tr");

            const homeTeam =
                teamNames[game.homeTeamId] || "Unknown Team";

            const awayTeam =
                teamNames[game.awayTeamId] || "Unknown Team";

            const score =
                game.homeScore == null || game.awayScore == null
                    ? "Not available"
                    : `${game.homeScore} - ${game.awayScore}`;

            const values = [
                game.gameId,
                game.gameDate,
                homeTeam,
                awayTeam,
                score,
                game.gameStatus
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            table.appendChild(row);
        });

        if (games.length === 0) {
            table.innerHTML =
                '<tr><td colspan="6">No games found.</td></tr>';
        }

    } catch (err) {
        count.textContent = "";
        error.textContent =
            "Could not load games. Please try again.";

        console.error(err);
    }
}

loadGames();
