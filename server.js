const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const TOKEN = "8690479197:AAHbBq3efzBLb0zSkqFbEO-4qgBdr1a_mKk";
const CHAT_ID = "6055828369";

app.post('/reservation', async (req, res) => {
  const { name, phone, ds, de, car, msg, ins } = req.body;

  const text = `
🚗 Nouvelle réservation Easyrent

Véhicule : ${car}
Client : ${name}
Téléphone : ${phone}
Du : ${ds}
Au : ${de}
Assurance : ${ins}
Message : ${msg || "Aucun"}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text
    });

    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Erreur Telegram" });
  }
});

app.get('/', (req, res) => {
  res.send("Serveur Easyrent OK ✅");
});

app.listen(10000, () => console.log("Server running"));