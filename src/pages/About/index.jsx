import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import uniqid from 'uniqid';
import styles from './style.module.scss';

const About = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true); //loading pages
  const [evolution, setEvolution] = useState([]);
  const [evolution1, setEvolution1] = useState([]);
  const [evolution2, setEvolution2] = useState([]);
  const [evolution3, setEvolution3] = useState([]);
  const [selectTab, setSelectTab] = useState(1);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);

      const responseA = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${response.data.name}`);
      const responseB = await axios.get(responseA.data.evolution_chain.url);
      setEvolution(responseB.data);

      const id1 = (responseB.data.chain ? await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${responseB.data.chain?.species.name}`) : null);
      const id2 = (responseB.data.chain?.evolves_to[0] ? await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${responseB.data.chain?.evolves_to[0]?.species.name}`) : null);
      const id3 = (responseB.data.chain?.evolves_to[0]?.evolves_to[0] ? await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${responseB.data.chain?.evolves_to[0]?.evolves_to[0]?.species.name}`) : null);
      setEvolution1(id1 ? id1.data : null);
      setEvolution2(id2 ? id2.data : null);
      setEvolution3(id3 ? id3.data : null);
      setLoading(false);
    };
    
    fetchPokemonData();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>
      <img src="/gif_loading.gif" alt="Loading..." />
    </div>
  }
  
  return (
    <div className={styles.About}>
      <div className={styles.container_head}>
        <Link className={`${styles.btn} ${styles.btn_back}`} to='/'>Back</Link>
        <div className={styles.name_head}>{pokemon.name}</div>
        <div className={styles.container_id}>
          <div className={styles.id_pokemon}>#{pokemon.id}</div>
        </div>
      </div>

      <div className={styles.container_main}>
        <div className={styles.img_pokemon}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
          />
        </div>
        <div className={styles.container_info}>
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${selectTab === 1 ? styles.selectTab : ""}`} onClick={() => setSelectTab(1)}>Pokedex</div>
            <div className={`${styles.tab} ${selectTab === 2 ? styles.selectTab : ""}`} onClick={() => setSelectTab(2)}>Stats</div>
            <div className={`${styles.tab} ${selectTab === 3 ? styles.selectTab : ""}`} onClick={() => setSelectTab(3)}>Evolution</div>
          </div>
          <div className={styles.info}>
            <div className={`${styles.content} ${selectTab === 1 ? styles.active_content : ""}`}>
              <div className={styles.info_item}>
                <div className={styles.info_title}>
                  Types
                </div>
                <div className={styles.info_datas}>
                  {pokemon.types?.map((type) => (
                    <div key={uniqid('type-')} className={styles.info_data}>
                        {type.type.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_title}>Height</div>
                <div className={styles.info_datas}>{pokemon.height / 10} m</div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_title}>Weight</div>
                <div className={styles.info_datas}>{pokemon.weight / 10} kg</div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_title}>
                  Abilities
                </div>
                <div className={styles.info_datas}>
                  {pokemon.abilities?.map((ability) => (
                    <div key={uniqid('ability-')} className={styles.info_data}>
                        {ability.ability.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`${styles.content} ${selectTab === 2 ? styles.active_content : ""}`}>
              {pokemon.stats?.map((stat) => (
                <div key={uniqid('stat-')} className={styles.info_item}>
                  <div className={styles.info_title}>{stat.stat.name}</div>
                  <div className={styles.info_datas}>
                    <div className={styles.info_data}>{stat.base_stat}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`${styles.content} ${selectTab === 3 ? styles.active_content : ""}`}>
              {evolution.chain &&
              <div className={styles.info_item}>
                <div className={styles.info_title}>
                  {evolution.chain?.species.name}
                </div>
                <div className={styles.info_datas}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evolution1.id}.svg`}
                    alt={evolution.chain?.species.name}
                  />
                </div>
              </div>}
              {evolution.chain?.evolves_to[0] &&
              <div className={styles.info_item}>
                <div className={styles.info_title}>
                  {evolution.chain?.evolves_to[0]?.species.name}
                </div>
                <div className={styles.info_datas}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evolution2.id}.svg`}
                    alt={evolution.chain?.evolves_to[0]?.species.name}
                  />
                </div>
              </div>}
              {evolution.chain?.evolves_to[0]?.evolves_to[0] &&
              <div className={styles.info_item}>
                <div className={styles.info_title}>
                  {evolution.chain?.evolves_to[0]?.evolves_to[0]?.species.name}
                </div>
                <div className={styles.info_datas}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evolution3.id}.svg`}
                    alt={evolution.chain?.evolves_to[0]?.evolves_to[0]?.species.name}
                  />
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;