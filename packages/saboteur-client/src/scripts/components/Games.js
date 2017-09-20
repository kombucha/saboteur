import React from "react";
import GameItem from "./GameItem";
import "../../styles/Games.css";

export default ({ games, deleteGame }) =>
  <div className="games">
    {!games || games.length === 0
      ? <p>Empty</p>
      : <ul className="games__list">
          {games.map(game =>
            <li className="game__list__item" key={game.id}>
              <GameItem game={game} onDeleteClick={deleteGame} />
            </li>
          )}
        </ul>}
  </div>;
