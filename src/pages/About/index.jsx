import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';

const About = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);
    };

    fetchPokemonData();
  }, [id]);
  
  return (
    <div className={styles.About}>
      <p>Id: <span className={styles.boldText}>{pokemon.id}</span></p>
      <p>Name: <span className={styles.boldText}>{pokemon.name}</span></p>
      <p>Height: <span className={styles.boldText}>{pokemon.height / 10} m</span></p>
      <p>Weight: <span className={styles.boldText}>{pokemon.weight / 10} kg</span></p>
    </div>
  );
}

export default About;