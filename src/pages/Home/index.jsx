import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Pokemons from "./Pokemons";
import styles from "./style.module.scss";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]); //all pokemons
  const [selectedPokemon, setSelectedPokemon] = useState(null); //selected pokemon
  const [loading, setLoading] = useState(true); //loading pages
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100");
      const results = response.data.results;

      const pokemonPromises = results.map(async (result) => {
        const pokemonResponse = await axios.get(result.url);
        return pokemonResponse.data;
      });

      const pokemonList = await Promise.all(pokemonPromises);
      setPokemonList(pokemonList);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const lastPokemonIndex = currentPage * pokemonsPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
  const currentPokemon = pokemonList.slice(firstPokemonIndex, lastPokemonIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(prev => prev - 1);
  const nextPage = () => setCurrentPage(prev => prev + 1);

  if (loading) {
    return <div className={styles.loading}>
      <img src="/gif_loading.gif" alt="Loading..." />
    </div>
  }
  
  return (
    <div className={styles.PokemonList}>
      <div className={styles.header}>
        <h2 className={styles.text_pokemons}>Pokemons</h2>
      </div>
      <Pokemons className={styles.Pokemon}
        currentPokemon={currentPokemon}
        loading={loading}
        handlePokemonSelect={handlePokemonSelect}
        setSelectedPokemon={setSelectedPokemon}
        selectedPokemon={selectedPokemon}
      />
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        totalPokemons={pokemonList.length}
        currentPage={currentPage}
        loading={loading}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default Home;
