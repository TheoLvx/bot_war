const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/action', (req, res) => {
  res.json({ move: "DOWN", action: "COLLECT" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
