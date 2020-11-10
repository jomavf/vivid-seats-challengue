import React from "react";
import { PokemonItem } from "./PokemonItem";
import "../App.css";

export const PokemonList = ({ pokemons = [], keyword = "" }) => {
  return (
    <>
      <ul className="suggestions">
        {pokemons.map((pokemon, index) => {
          const { Name, Types, img } = pokemon;
          return (
            <li key={index}>
              <PokemonItem
                urlImage={img}
                name={Name}
                nameFound={keyword}
                types={Types}
              ></PokemonItem>
            </li>
          );
        })}
        {pokemons.length === 0 && (
          <li>
            <img
              src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
              alt=""
            />
            <div className="info">
              <h1 className="no-results">No results</h1>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};
