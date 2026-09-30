const fetch = require('node-fetch');

async function updateScores() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  const firebaseURL = process.env.FIREBASE_DATABASE_URL;

  const today = new Date().toISOString().split('T')[0];

  console.log(`Mise à jour des scores pour la date : ${today}`);

  try {
    const apiResponse = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
      headers: {
        'x-apisports-key': apiKey
      }
    });
    
    const data = await apiResponse.json();

    if (!data.response) {
      console.error("Erreur dans la réponse de l'API", data);
      return;
    }

    const firebaseResponse = await fetch(`${firebaseURL}/matches/${today}.json`, {
      method: 'PUT',
      body: JSON.stringify(data.response),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (firebaseResponse.ok) {
      console.log("Succès : Firebase a été mis à jour !");
    } else {
      console.error("Erreur lors de l'enregistrement sur Firebase");
    }

  } catch (error) {
    console.error("Erreur technique :", error);
  }
}

updateScores();
