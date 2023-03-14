import React, { useState } from "react";
import styles from "./style.module.scss";

const Pagination = ({ pokemonsPerPage, totalPokemons, currentPage, paginate, prevPage, nextPage }) => {
  const pageNumbers = [];
  const [selectedPage, setSelectedPage] = useState(currentPage);

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (number) => {
    setSelectedPage(number);
    paginate(number);
  };

  const handlePrevClick = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
      prevPage();
    }
  };

  const handleNextClick = () => {
    if (selectedPage < Math.ceil(totalPokemons / pokemonsPerPage)) {
      setSelectedPage(selectedPage + 1);
      nextPage();
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={`${styles.btn_prev} ${styles.btn}`} onClick={handlePrevClick}>prev</div>
      {pageNumbers.map((number) => (
        <div
          className={`${styles.page_item} ${selectedPage === number ? styles.selected_page : ""}`}
          key={number}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </div>
      ))}
      <div className={`${styles.btn_next} ${styles.btn}`} onClick={handleNextClick}>next</div>
    </div>
  );
};

export default Pagination;