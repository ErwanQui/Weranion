const Ably = require('ably');

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
    activePlayers.push([id, firstname, lastname]);
  }

  const channel = ably.channels.get('playersList');
  channel.publish('players', activePlayers);
}

function getActivePlayers() {
  return activePlayers;
}

module.exports = { addPlayer, getActivePlayers };