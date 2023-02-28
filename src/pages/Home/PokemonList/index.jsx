import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.scss";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100").then((response) => {
      setPokemonList(response.data.results);
    });
  }, []);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className={styles.pokemon_list}>
      <div className={styles.pokemon_list_items}>
        {pokemonList.map((pokemon, index) => (
          <div
            key={pokemon.name}
            className={styles.pokemon_item}
            onMouseEnter={() => handlePokemonSelect({ ...pokemon, id: index + 1 })}
            onMouseLeave={() => setSelectedPokemon(null)}
          >
            {pokemon.name}
          </div>
        ))}
      </div>
      <div className={styles.pokemon_box_info}>
        {selectedPokemon && (
          <div className={styles.pokemon_info}>
            <div className={styles.pokemon_image_container}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${selectedPokemon.id}.svg`}
                alt={selectedPokemon.name}
              />
            </div>
            <p>ID: {console.log(selectedPokemon)}</p>
            <p>Name: {console.log(selectedPokemon.name)}</p>
            <p>Height: {console.log(selectedPokemon.height)}</p>
            <p>Weight: {console.log(selectedPokemon.weight)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;