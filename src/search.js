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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ color: '#333' }}>Search Countries by Name or Capital</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by country or capital"
        style={{
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '20px',
          fontSize: '16px',
        }}
      />
      {filteredCountries.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredCountries.map((country, index) => (
            <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              <strong>{country.country}</strong> - {country.capital}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCountries;
