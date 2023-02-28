import React from 'react';
import styles from './style.module.scss';
import PokemonList from './PokemonList';

function Home() {
  return (
    <div className={styles.Home}>
      <PokemonList/>
    </div>
  );
}

export default Home;
