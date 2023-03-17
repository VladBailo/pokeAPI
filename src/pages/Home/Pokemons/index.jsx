import React from 'react';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import styles from "./style.module.scss";

const Pokemons = ({currentPokemon, handlePokemonSelect, setSelectedPokemon, selectedPokemon}) => {
  return (
    <div className={styles.pokemon_list}>
      <div className={styles.pokemon_list_items}>
        {currentPokemon.map((pokemon, index) => (
          <Link
            key={pokemon.name}
            to={`/About/pokemon/${pokemon.id}`}
            className={styles.pokemon_item}
            onMouseEnter={() => handlePokemonSelect({ ...pokemon, index})}
            onMouseLeave={() => setSelectedPokemon(null)}
          >
            <div className={styles.text_list_items}>
                {pokemon.name.toUpperCase()}
            </div>
            <div className={styles.img_list_items}>
              <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt={pokemon.name}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.pokemon_box_info}>
        {selectedPokemon && (
          <div className={styles.pokemon_info}>
            <div className={styles.idAndNameAndImg}>
              <div className={styles.idAndName}>
                <div className={styles.id}>#{selectedPokemon.id}</div>
                <div className={styles.name}>{selectedPokemon.name.toUpperCase()}</div>
              </div>
              <div className={styles.pokemon_image_container}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${selectedPokemon.id}.svg`}
                  alt={selectedPokemon.name}
                />
              </div>
            </div>
            <div className={styles.pokemon_info_item}>
              <div className={styles.item_title}>
                Type
              </div>
              <div className={styles.item_datas}>
                {selectedPokemon.types?.map((type) => (
                  <div key={uniqid('type-')} className={styles.item_data}>
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.pokemon_info_item}>
              <div className={styles.item_title}>
                Height
              </div>
              <div className={styles.item_data}>
                {selectedPokemon.height / 10} m
              </div>
            </div>
            <div className={styles.pokemon_info_item}>
              <div className={styles.item_title}>
                Weight
              </div>
              <div className={styles.item_data}>
                {selectedPokemon.weight / 10} kg
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemons;
