const express = require('express');
const cors = require('cors');
const { decideAction } = require('./app/botLogic');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Route obligatoire du jeu (appelée à chaque tick)
app.get('/action', (req, res) => {
  console.log("Reçu:", req.body);  // <--- Ici tu verras si un JSON est envoyé
  res.json({ move: "UP", action: "COLLECT" });
});


app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
