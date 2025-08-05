const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let currentCommand = { move: "STAY", action: "NONE" };
let lastUpdate = Date.now();

const maxDelay = 3000; // 5 secondes d'inactivité max avant "forcer" la continuité

// Route pour récupérer l'action du bot (appelée à chaque tick)
app.get('/action', (req, res) => {
  const now = Date.now();

  if (now - lastUpdate > maxDelay) {
    // Pas de nouvelle commande depuis plus de 5s, on garde la dernière commande
    console.log("Inactivité > 5s, renvoi dernière commande:", currentCommand);
  } else {
    console.log("Commande récente, renvoi:", currentCommand);
  }

  res.json(currentCommand);
});

// Route pour définir une nouvelle commande via l'interface
app.post('/setAction', (req, res) => {
  const { move, action } = req.body;
  if (
    ["UP", "DOWN", "LEFT", "RIGHT", "STAY"].includes(move) &&
    ["BOMB", "COLLECT", "NONE"].includes(action)
  ) {
    currentCommand = { move, action };
    lastUpdate = Date.now();
    console.log("Commande mise à jour:", currentCommand);
    res.json({ status: "ok", currentCommand });
  } else {
    res.status(400).json({ error: "Valeurs invalides" });
  }
});

app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
