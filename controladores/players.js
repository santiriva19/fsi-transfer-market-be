const data = require("../data-dummy/data.json");

const { rtdb } = require("../db/connection");

// list of players
const getAllPlayers = async () => {
  try {
    const snapshot = await rtdb.ref("players").once("value");
    const data = snapshot.val() || {};
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Algo pasó");
  }
};

// create new player
const createPlayer = (player) => {
  data.players.push(player);
  return { message: "se creó el jugador", error: false };
};

const updatePlayer = (id, newInfoPlayer) => {
  const playerFoundIndex = data.players.findIndex(
    (player) => `${player.id}` === id
  );

  // .find() -> LES VA A RETORNAR UN ELEMENTO DE LA LISTA QUE CUMPLA CON UNA CONDICIONAL ==> OBJETO
  // .findIndex() -> LES VA A RETORNAR LA POSICION DEL ELEMENTO QUE CUMPLA CON UNA CONDICIONAL ==> NUMERO
  // .filter() -> LES VA A RETORNAR UNA NUEVA LISTA CON ELEMENTOS QUE CUMPLAN CON UNA CONDICIONAL ==> LISTA

  if (!playerFoundIndex) {
    return {
      message: "Error, jugador no encontrado",
      error: true,
      status: 404,
    };
  } else {
    data.players[playerFoundIndex] = {
      id: id,
      ...newInfoPlayer,
    };
    const playerUpdated = data.players[playerFoundIndex];

    return {
      message: `La información del jugador ${playerUpdated.name} fue actualizada`,
      error: false,
      player: playerUpdated,
      status: 200,
    };
  }
};

const deletePlayer = (id) => {
  data.players = data.players.filter((player) => player.id !== id);
};

module.exports = {
  getAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
