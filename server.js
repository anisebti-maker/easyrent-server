const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = "8690479197:AAHbBq3efzBLb0zSkqFbEO-4qgBdr1a_mKk";
const CHAT_ID = "1003562619802";

app.post('/reservation', async (req, res) => {
  const { name, phone, ds, de, car, price, total, msg, ins } = req.body;

  const text = `
🚗 Nouvelle réservation Easyrent

🚘 Véhicule : ${car}
💵 Prix : ${price}
📅 Du : ${ds}
📅 Au : ${de}
💰 Total estimé : ${total}
🛡️ Assurance : ${ins}

👤 Client : ${name}
📞 Téléphone : ${phone}
💬 Message : ${msg || "Aucun"}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text
    });
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Erreur envoi Telegram" });
  }
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
