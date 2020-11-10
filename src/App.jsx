import React, { useState } from "react";
import "./App.css";
import { PokemonList } from "./components/PokemonList";

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
  const [beforeSort, setBeforeSort] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  function onChangeValue(e) {
    const value = e.target.value;
    if (typeof value === "string") {
      setSearch(value.toLowerCase());
    }
  }

  async function getPokemons() {
    const response = await fetch(URL_PATH);
    const result = await response.json();
    return result;
  }

  function getFilteredPokemons(search, pokemons, attr) {
    return pokemons.filter((pokemon) => {
      if (typeof pokemon[attr] === "string") {
        return pokemon[attr].toLowerCase().includes(search);
      } else if (typeof pokemon[attr] === "object") {
        const matches = pokemon[attr].filter((type) => {
          return type.toLowerCase().includes(search);
        });
        return matches.length > 0;
      }
      return false;
    });
  }

  function getSortedPokemons(pokemonsArray) {
    const _pokemonsSorted = [...pokemonsArray];
    return _pokemonsSorted.sort((a, b) => b.MaxCP - a.MaxCP);
  }

  async function onKeyUpValue(e) {
    const value = e.target.value;
    if (value) {
      setLoading(true);
      const pokemons = await getPokemons();
      let filteredPokemons = getFilteredPokemons(search, pokemons, "Name");
      if (filteredPokemons.length === 0) {
        filteredPokemons = getFilteredPokemons(search, pokemons, "Types");
      }
      const fourFilteredPokemons = filteredPokemons.slice(0, 4);
      let sortedAndFilteredPokemons = fourFilteredPokemons;
      if (checkboxChecked) {
        sortedAndFilteredPokemons = getSortedPokemons(fourFilteredPokemons);
      }
      setPokemons(sortedAndFilteredPokemons);
      setLoading(false);
    } else {
      setPokemons([]);
      setBeforeSort([]);
      setLoading(false);
    }
  }

  function handleCheckbox(e) {
    if (e.target.checked) {
      // sort
      setCheckboxChecked(e.target.checked);
      console.log("pokemons", pokemons);
      setBeforeSort(pokemons);
      setPokemons(getSortedPokemons(pokemons));
    } else {
      // normal search
      setCheckboxChecked(e.target.checked);
      setPokemons(beforeSort.length === 0 ? pokemons : beforeSort);
      setBeforeSort(pokemons);
    }
  }

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" onChange={(e) => handleCheckbox(e)} />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        value={search}
        onChange={(e) => onChangeValue(e)}
        onKeyUp={(e) => onKeyUpValue(e)}
      />
      {loading && <div className="loader"></div>}
      <PokemonList pokemons={pokemons} keyword={search}></PokemonList>
    </>
  );
};

export default App;
