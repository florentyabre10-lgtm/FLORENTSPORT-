import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    databaseURL: "https://florentsport-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Écoute de Firebase en temps réel (0 requête API consommée par les visiteurs)
const matchsRef = ref(db, 'matchs_du_jour');
onValue(matchsRef, (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById('matchs-container');
    container.innerHTML = '';

    if (!data) {
        container.innerHTML = '<p style="text-align:center; color:#94a3b8; margin-top:20px;">Aucun match en direct pour le moment.</p>';
        return;
    }

    Object.values(data).forEach(match => {
        const home = match.teams.home;
        const away = match.teams.away;
        const goals = match.goals;
        const status = match.fixture.status;

        let statusText = status.short;
        if (status.elapsed) statusText = `${status.elapsed}'`;

        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                <img src="${match.league.logo}" class="league-logo" alt="">
                <span class="league-name">${match.league.name}</span>
            </div>
            <div class="match-content">
                <div class="team-name left">
                    <img src="${home.logo}" class="team-logo" alt="">
                    <span>${home.name}</span>
                </div>
                <div class="score-box">
                    <span class="score-text">${goals.home ?? 0} - ${goals.away ?? 0}</span>
                    <span class="match-status">${statusText}</span>
                </div>
                <div class="team-name right">
                    <span>${away.name}</span>
                    <img src="${away.logo}" class="team-logo" alt="">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
});
