import fetch from 'node-fetch';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
    databaseURL: "https://florentsport-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const API_KEY = process.env.API_KEY_SPORTS;

async function synchroniser() {
    try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
            headers: { 'x-apisports-key': API_KEY }
        });
        const result = await response.json();

        if (result.response && result.response.length > 0) {
            const dataToSave = {};
            result.response.forEach(m => {
                dataToSave[m.fixture.id] = m;
            });
            await set(ref(db, 'matchs_du_jour'), dataToSave);
            console.log('Firebase mis à jour avec succès !');
        } else {
            console.log('Aucun match en direct actuellement.');
        }
    } catch (err) {
        console.error('Erreur lors de la synchronisation:', err);
    }
    process.exit(0);
}

synchroniser();
