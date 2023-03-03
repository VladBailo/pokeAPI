import React from "react";
import styles from "./style.module.scss";

const Pokemons = ({currentPokemon, loading, handlePokemonSelect, setSelectedPokemon, selectedPokemon}) => {
  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className={styles.pokemon_list}>
      <div className={styles.pokemon_list_items}>
        {currentPokemon.map((pokemon, index) => (
          <div
            key={pokemon.name}
            className={styles.pokemon_item}
            onMouseEnter={() => handlePokemonSelect({ ...pokemon, index})}
            onMouseLeave={() => setSelectedPokemon(null)}
          >
            <div className={styles.text_list_items}>
                {pokemon.name.toUpperCase()}
            </div>
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
            <p>ID: <span className={styles.boldText}>{selectedPokemon.id}</span></p>
            <p>Name: <span className={styles.boldText}>{selectedPokemon.name.toUpperCase()}</span></p>
            <p>Height: <span className={styles.boldText}>{selectedPokemon.height / 10} m</span></p>
            <p>Weight: <span className={styles.boldText}>{selectedPokemon.weight / 10} kg</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemons;