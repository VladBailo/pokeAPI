import React from 'react';
import styles from "./style.module.scss";

const Pagination = ({pokemonsPerPage, totalPokemons, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
      <div>
        <ul className={styles.pagination}>
            {
                pageNumbers.map(number => (
                    <li className={styles.page_item} key={number}>
                        <a href="!#" className={styles.page_link} onClick={() => paginate(number)}>
                            <div>{number}</div>
                        </a>
                    </li>
                ))
            }
        </ul>
      </div>
    );
}
  
export default Pagination;