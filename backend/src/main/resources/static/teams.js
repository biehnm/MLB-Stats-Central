
const API_URL = "/api/teams";

async function loadTeams() {
    const container = document.getElementById("teams-container");
    const count = document.getElementById("team-count");
    const error = document.getElementById("error-message");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to retrieve teams.");
        }

        const teams = await response.json();

        container.innerHTML = "";
        count.textContent = `Total Teams: ${teams.length}`;

        teams.forEach(team => {
            const card = document.createElement("div");
            card.className = "team-card";

            const name = document.createElement("h3");
            name.textContent = team.teamName;

            const abbreviation = document.createElement("p");
            abbreviation.className = "team-abbreviation";
            abbreviation.textContent = team.abbreviation;

            const city = document.createElement("p");
            city.textContent = `City: ${team.city}`;

            const id = document.createElement("p");
            id.textContent = `Team ID: ${team.teamId}`;

            card.appendChild(name);
            card.appendChild(abbreviation);
            card.appendChild(city);
            card.appendChild(id);

            container.appendChild(card);
        });

        if (teams.length === 0) {
            container.textContent = "No teams found.";
        }

    } catch (err) {
        count.textContent = "";
        error.textContent =
            "Could not load teams. Please try again.";

        console.error(err);
    }
}

loadTeams();
