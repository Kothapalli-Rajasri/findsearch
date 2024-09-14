import React, { useState, useEffect } from 'react';

const SearchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all'); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data.map(country => ({
          country: country.name.common,
          capital: country.capital ? country.capital[0] : 'N/A'
        }))); 
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const searchResults = countries.filter(country =>
        country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(searchResults);
    } else {
      setFilteredCountries([]);
    }
  }, [searchQuery, countries]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Countries by Name or Capital</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by country or capital"
        style={styles.input}
      />
      {filteredCountries.length > 0 && (
        <ul style={styles.countryList}>
          {filteredCountries.map((country, index) => (
            <li key={index} style={styles.countryItem}>
              <strong style={styles.countryName}>{country.country}</strong>
              <span style={styles.capitalName}> - {country.capital}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#2c3e50',
    fontSize: '28px',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    width: '350px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    outline: 'none',
    fontSize: '16px',
    transition: 'border 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  countryList: {
    listStyle: 'none',
    padding: 0,
    marginTop: '30px',
    width: '80%',
    margin: '0 auto',
    maxWidth: '600px',
  },
  countryItem: {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
    border: '1px solid #e1e1e1',
  },
  countryItemHover: {
    transform: 'scale(1.03)',
  },
  countryName: {
    fontWeight: 'bold',
    color: '#34495e',
  },
  capitalName: {
    color: '#7f8c8d',
  },
};

export default SearchCountries;
