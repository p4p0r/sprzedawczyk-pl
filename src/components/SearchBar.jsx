import React from 'react'
import classes from '../pages/PostsPage.module.css'

function SearchBar() {
  return (
    <>
        <div className={classes.searchbox}>Szukaj:</div>
        <div className={classes.searchbar}>
        <input type="text" name="searchText"/>
        
        <select name="searchCategory">
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
        Od: <input type="number" name="searchFromPrice"/> PLN<br/>
        Do: <input type="number" name="searchToPrice"/> PLN

        <div>Miejscowość</div>
        <input type="text" name="searchLocation"/>

        <button>SZUKAJ!!!!!!!!!!!!</button>

    </div>
    </>
    
  )
}

export default SearchBar