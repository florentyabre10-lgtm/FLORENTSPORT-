const fetch = require('node-fetch');

const apiKey = process.env.FOOTBALL_API_KEY;
const databaseURL = process.env.FIREBASE_DATABASE_URL;

if (!apiKey || !databaseURL) {
  console.error("Erreur : Variables d'environnement manquantes.");
  process.exit(1);
}

async function syncMatches() {
  try {
    // Récupère la date du jour ou celle passée en argument (format YYYY-MM-DD)
    const targetDate = process.argv[2] || new Date().toISOString().split('T')[0];
    console.log(`Récupération des matchs pour la date : ${targetDate}`);
    
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${targetDate}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    });

    const data = await response.json();
    
    if (!data.response || data.response.length === 0) {
      console.log(`Aucun match trouvé pour le ${targetDate}.`);
      return;
    }

    const matchesMap = {};
    data.response.forEach(match => {
      matchesMap[match.fixture.id] = match;
    });

    // Stocke les matchs sous une clé spécifique à la date dans Firebase (ex: matches_2026-09-30)
    const fbResponse = await fetch(`${databaseURL}/matches_by_date/${targetDate}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(matchesMap)
    });

    if (!fbResponse.ok) {
      throw new Error(`Erreur Firebase : ${fbResponse.statusText}`);
    }

    console.log(`Synchronisation réussie pour le ${targetDate} !`);
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error);
    process.exit(1);
  }
}

syncMatches();
