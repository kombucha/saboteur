"use strict";

var MIN_PLAYERS_COUNT = 2;

var ROLES = {
  BUILDER: "BUILDER",
  DESTROYER: "DESTROYER"
};

var STATUSES = {
  WAITING_FOR_PLAYERS: "WAITING_FOR_PLAYERS",
  PLAYING: "PLAYING",
  ROUND_END: "ROUND_END",
  COMPLETED: "COMPLETED"
};

var DESTINATION_TYPES = {
  DISCARD: "DISCARD",
  SLOT: "SLOT",
  PLAYER: "PLAYER"
};

module.exports = {
  DESTINATION_TYPES: DESTINATION_TYPES,
  MIN_PLAYERS_COUNT: MIN_PLAYERS_COUNT,
  ROLES: ROLES,
  STATUSES: STATUSES
};
