const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let currentCommand = { move: "STAY", action: "NONE" };

// Route pour récupérer l'action du bot (appelée à chaque tick)
app.get('/action', (req, res) => {
  console.log("Envoi action:", currentCommand);
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
    console.log("Commande mise à jour:", currentCommand);
    res.json({ status: "ok", currentCommand });
  } else {
    res.status(400).json({ error: "Valeurs invalides" });
  }
});

app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
 