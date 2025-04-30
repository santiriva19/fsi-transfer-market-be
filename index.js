const express = require("express");
const {
  getAllPlayers,
  createPlayer,
  updatePlayer,
} = require("./controladores/players");

const app = express();
const port = 3035;

app.use(express.json());

// CREAR APIs

//PLAYERS
app.get("/players", (req, res) => {
  const players = getAllPlayers();
  if (players.length === 0) {
    res.status(404).json({ message: "No hay jugadores", error: true });
  } else {
    res.status(200).json({
      message: "listado de jugadores",
      players: players,
    });
  }
});

app.post("/players", (req, res) => {
  const { player } = req.body;
  if (player) {
    const response = createPlayer(player);
    res.status(200).json(response);
  }
});

app.put("/players/:id", (req, res) => {
  const { id } = req.params;
  const { player } = req.body;

  const response = updatePlayer(id, player);
  res.status(response.status).json(response);
});

app.delete("/players", (req, res) => {});

// MANEGERS

//

app.listen(port, () => {
  console.log("La aplicacion corrió bien 🚀");
});
