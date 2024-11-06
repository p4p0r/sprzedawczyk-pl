import React, { useState } from 'react'
import classes from '../pages/PostsPage.module.css'
import axios from 'axios'

function SearchBar({ setSearchResults }) {
  const [searchParams, setSearchParams] = useState({
    searchText: '',
    searchCategory: 'anycategory',
    searchFromPrice: '',
    searchToPrice: '',
    searchLocation: ''
  });
      
  function handleChange(e) {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  }
      
  function handleSubmit(e) {
    e.preventDefault();
    axios.get('http://localhost:8000/api/search', { params: searchParams })
      .then(response => { setSearchResults(response.data); })
      .catch(error => { console.error("Error fetching search results:", error); });
  }

  return (
    <>
    <div className={classes.searchbox}>Szukaj</div>
    <div className={classes.searchbar}>
      <form onSubmit={handleSubmit}>
        Treść:<br/>
        <input type="text" name="searchText" onChange={handleChange} /><br />
        Kategoria:<br/>
        <select name="searchCategory" onChange={handleChange}>
          <option value="anycategory">Dowolna</option>
          <option value="automotive">Motoryzacja</option>
          <option value="electronics">Elektronika</option>
          <option value="clothing">Odzież, obuwie</option>
          <option value="home">Dom i ogród</option>
          <option value="children">Dla dzieci</option>
          <option value="activity">Sport, aktywność</option>
          <option value="other">Inne</option>
        </select>

        <div>Cena:</div>
        Od: <input type="number" className={classes.inputprice} name="searchFromPrice" onChange={handleChange} /> PLN <br/>
        Do: <input type="number" className={classes.inputprice} name="searchToPrice" onChange={handleChange} /> PLN

        <div>Miejscowość</div>
        <input type="text" name="searchLocation" onChange={handleChange} />

        <button type="submit">Wyszukaj</button>
      </form>
      </div>
      <div className={classes.searchbox2}>Sprzedawczyk.pl</div>
    </>
    
  )
}

export default SearchBar
