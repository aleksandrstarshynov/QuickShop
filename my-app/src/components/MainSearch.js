import React, { useState } from 'react';
import '../styles/MainSearch.css';


export default function TrySearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <section className="try-search">
      <h2 className="try-search__title">Ready to try?</h2>
      <form className="try-search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="try-search__input"
          placeholder="Enter a description of the painting"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="try-search__button">
          Search
        </button>
      </form>
    </section>
  );
}
