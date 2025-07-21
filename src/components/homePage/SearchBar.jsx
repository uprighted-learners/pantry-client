import React, { useState } from 'react';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      alert("Please enter a zip code");
      return;
    }
    console.log("Searching for a zip code:", query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for panty by zip code (enter zipcode here)"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>SEARCH</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '30px',
  },
  input: {
    padding: '8px',
    width: '500px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid var(--gold)',
    backgroundColor: 'var(--purple)',
    color: '#fff',
    cursor: 'pointer',
  }
};

export default SearchBar;

