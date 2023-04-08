import React from "react";
import "./Card.css";
import { TYPE_COLORS} from "../utils/typeColors";

function Card({ pokemon }) {
  return (
    <div className="Card">
      <div className="Card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="Card__name">{pokemon.name}</div>
      <div className="Card__types">
        {pokemon.types.map((type) => {
          return (
            <div
              key={type.type.name}
              className="Card__type"
              style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className="Card__info">
        <p>Weight: {pokemon.weight}</p>
        <p>Height: {pokemon.height}</p>
        <p>Ability: {pokemon.abilities[0].ability.name}</p>
      </div>
    </div>
  );
}

export default Card;
