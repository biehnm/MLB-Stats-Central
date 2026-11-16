
const API_URL = "/api/players";

async function loadPlayers() {
    const table = document.getElementById("players-table");
    const count = document.getElementById("player-count");
    const error = document.getElementById("error-message");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to retrieve players.");
        }

        const players = await response.json();

        table.innerHTML = "";

        count.textContent = `Total Players: ${players.length}`;

        players.forEach(player => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${player.playerId}</td>
                <td>${player.firstName}</td>
                <td>${player.lastName}</td>
                <td>${player.position}</td>
                <td>${player.jerseyNumber ?? ""}</td>
                <td>${player.teamId ?? ""}</td>
            `;

            table.appendChild(row);
        });

        if (players.length === 0) {
            table.innerHTML =
                '<tr><td colspan="6">No players found.</td></tr>';
        }

    } catch (err) {
        count.textContent = "";
        error.textContent = "Could not load players. Please try again.";
        table.innerHTML =
            '<tr><td colspan="6">Unable to load player data.</td></tr>';

        console.error(err);
    }
}

loadPlayers();
