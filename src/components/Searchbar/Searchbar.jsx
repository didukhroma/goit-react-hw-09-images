import { useState } from 'react';
import Loader from '../Loader';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
const INITIAL_STATE = '';

const Searchbar = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState(INITIAL_STATE);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setQuery(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery(INITIAL_STATE);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
        {isLoading && <Loader />}
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default Searchbar;
