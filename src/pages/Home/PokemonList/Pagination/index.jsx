import React from "react";
import styles from "./style.module.scss";

const Pagination = ({pokemonsPerPage, totalPokemons, currentPage, loading, paginate, prevPage, nextPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            <div>
                {!loading && (                    
                    <div
                        className={`${styles.btn_prev} ${styles.btn}`}
                        onClick={currentPage > 1 ? prevPage : null}
                    >
                            <div className={styles.page_link}>
                                prev
                            </div>  
                    </div>)
                }
            </div>
            {
                pageNumbers.map(number => (
                    <div
                        className={styles.page_item}
                        key={number}
                        onClick={() => paginate(number)}
                    >
                        <div className={styles.page_link}>
                            {number}
                        </div>
                    </div>
                ))
            }
            <div>
                {!loading && (                    
                    <div
                        className={`${styles.btn_next} ${styles.btn}`}
                        onClick={currentPage < Math.ceil(totalPokemons / pokemonsPerPage) ? nextPage : null}
                    >
                            <div className={styles.page_link}>
                                next
                            </div>  
                    </div>)
                }
            </div>
        </div>
        
    );
}
  
export default Pagination;