import React from 'react'
import classes from './AddPage.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'

function AddPage() {

    const navigate=useNavigate()

    const[data, setData]=useState({
        addTitle:'',
        addLocation:'',
        addCategory:'other',
        addDescription:'',
        addPrice:0,
        addImage:null,
        userId:''
    })

    const[userName, setUserName]=useState(null);

    useEffect(() => {
      const storedUserId = localStorage.getItem('userId')
      const storedUserName = localStorage.getItem('userName')
  
      if(storedUserId)
        setData({...data, userId:storedUserId})
      else{
          alert("Nie jesteś zalogowany!")
          navigate("/")}
      
      if(storedUserName)
        setUserName(storedUserName)
  
    }, []);

    function handleChange(e){
        const{name, value}=e.target;
        setData({...data, [name]:value})
    }

    function handleFileChange(e){
        setData({...data, image: e.target.files[0]})
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData();
        formData.append('title', data.addTitle)
        formData.append('location', data.addLocation)
        formData.append('category', data.addCategory)
        formData.append('description', data.addDescription)
        if(data.addImage)
            formData.append('image', data.addImage)
        formData.append('userId', data.userId)

        axios.post('http://localhost:8000/api/upload', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error("Error: ", error);
          });
          navigate("/posts")
    }

  return (
    <div className={classes.main}>
    <NavBar user={userName}/>
    <form onSubmit={handleSubmit}>
        <h2>Dodaj ogłoszenie</h2>
        
        <h3>Tytuł*</h3>
        <input type="text" name="addTitle" value={data.addTitle} onChange={handleChange} required />
        
        <h3>Lokalizacja*</h3>
        <input type="text" name="addLocation" value={data.addLocation} onChange={handleChange} required />
        
        <h3>Kategoria</h3>
        <select name="addCategory" value={data.addCategory} onChange={handleChange}>
            <option value="automotive">Motoryzacja</option>
            <option value="electronics">Elektronika</option>
            <option value="clothing">Odzież, obuwie</option>
            <option value="home">Dom i ogród</option>
            <option value="children">Dla dzieci</option>
            <option value="activity">Sport, aktywność</option>
            <option value="other">Inne</option>
        </select>

        <h3>Opis</h3>
        <textarea name="addDescription" maxLength="512" value={data.addDescription} onChange={handleChange} ></textarea>

        <h3>Cena*</h3>
        <input type="number" name="addPrice" value={data.addPrice} onChange={handleChange} required/> PLN

        <h3>Zdjęcie</h3>
        <input type="file" accept=".png, .jpg, .bmp, .jpeg" name="addImage" value={data.addImage} onChange={handleFileChange} /><br/>

        <input type="submit" value="Dodaj ogłoszenie!" className={classes.submitForm}/><br/>

        <span>(*) - wymagane</span>

    </form>
    </div>
  )
}

export default AddPage