const Ably = require('ably');
const Player = require('./../models/player');

const ably = new Ably.Rest({
  key: process.env.ABLY_API_KEY,
});

const activePlayers = [];

function addPlayer(id, firstname, lastname) {
  let count = 0;
  while(activePlayers.length > count && !activePlayers[count][0].equals(id)) {
    count += 1;
  }
  if (activePlayers.length === count) {
    activePlayers.push([id, firstname, lastname, new Date().getTime()]);
  } else {
    activePlayers[count] = [id, firstname, lastname, new Date().getTime()];
  }
  const channel = ably.channels.get('playersList');
  channel.publish('players', activePlayers);
}

async function refreshPlayer(id) {
  const player = await Player.findOne({_id: id}).populate('pnj');
  if (player) {
    activePlayers.push([player._id, player.pnj.firstname, player.pnj.lastname, new Date().getTime()]);
  }

  const channel = ably.channels.get('playersList');
  channel.publish('players', activePlayers);
}

function getActivePlayers() {
  return activePlayers;
}

function updatePlayerActivity(id) {
  const currentPlayer = activePlayers.find((player) => player[0].equals(id));
  if (currentPlayer) {
    currentPlayer[3] = new Date().getTime();
  } else {
    refreshPlayer(id);
  }
}

function removeInactivePlayers() {
  let removed = false;
  for (let i = activePlayers.length - 1; i >= 0; i--) {
    if (new Date().getTime() - activePlayers[i][3] > 300000) {
      activePlayers.splice(i, 1);
      removed = true;
    }
  }
  if (removed) {
    const channel = ably.channels.get('playersList');
    channel.publish('players', activePlayers);
  }
}

module.exports = { addPlayer, getActivePlayers, updatePlayerActivity, removeInactivePlayers };  