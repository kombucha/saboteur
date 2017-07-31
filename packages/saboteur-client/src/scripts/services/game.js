import boardRules from "saboteur-shared/board";
import gameRules from "saboteur-shared/game";

const getCurrentPlayerIndex = (players, userId) =>
  players.map(player => player.id).indexOf(userId);

const format = (game, currentPlayerIndex) => {
  // TODO: refacto, ugly side effects
  game.board.forEach(boardRules.formatCardLayout);
  game.board.forEach(boardRules.attachLinkedToStart);

  const slots = boardRules.createSlotsFromCards(game.board);

  // format current player cards
  game.players[currentPlayerIndex].cards.forEach(card => {
    if (card.layout) {
      card.canRotate = true;
      card.isRotated = false;
    }
    boardRules.formatCardLayout(card);
    boardRules.attachPlayability(card, slots, game.players);
  });

  return { game, slots };
};

const canPlay = ({ selectedCard, type, destinationItem, userId }) => {
  return (
    selectedCard &&
    (type === gameRules.DESTINATION_TYPES.DISCARD ||
      (destinationItem.isHighlighted ||
        (type === "PLAYER" && destinationItem.id === userId)))
  );
};

export default {
  canPlay,
  format,
  getCurrentPlayerIndex
};