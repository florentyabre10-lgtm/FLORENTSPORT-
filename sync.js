// Importation compatible Node.js CommonJS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const admin = require('firebase-admin');

// Initialisation de Firebase avec les secrets GitHub / variables d'environnement
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.database();

// Fonction principale de synchronisation
async function syncSportsData() {
  console.log("🚀 Début de la synchronisation avec API-Sports...");

  try {
    // 1. Récupération des données depuis API-Football
    const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });

    const data = await response.json();

    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error("❌ Erreur retournée par l'API :", data.errors);
      process.exit(1);
    }

    console.log(`✅ ${data.results} matchs récupérés de l'API.`);

    // 2. Enregistrement des données dans Firebase Realtime Database
    const ref = db.ref("live_matches");
    await ref.set({
      last_updated: new Date().toISOString(),
      fixtures: data.response || []
    });

    console.log("🔥 Données synchronisées avec succès dans Firebase !");
    process.exit(0);

  } catch (error) {
    console.error("❌ Erreur pendant la synchronisation :", error);
    process.exit(1);
  }
}

// Lancement de la fonction
syncSportsData();
