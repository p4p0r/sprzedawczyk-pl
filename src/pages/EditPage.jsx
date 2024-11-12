import React, { useState, useEffect } from 'react';
import classes from './AddPage.module.css';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { useParams, useNavigate } from 'react-router-dom';

function AddPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [editTitle, setEditTitle] = useState('');

    const [data, setData] = useState({
        editDescription: '',
        editPrice: 0,
        userId: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`)
          .then(response => {
            setEditTitle(response.data.title);
            setData({
                editDescription: response.data.description,
                editPrice: response.data.price,
                userId: ''  // Pozostawienie pustego pola userId tutaj
            });
          })
          .catch(error => {
            console.error(error);
          });
      }, [id]);

    const [userName, setUserName] = useState(null);

    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      const storedUserName = localStorage.getItem('userName');
  
      if(storedUserId) {
        setData((prevData) => ({...prevData, userId: storedUserId}));
      } else {
          alert("Nie jesteś zalogowany!");
          navigate("/");
      }
      
      if(storedUserName) {
        setUserName(storedUserName);
      }
  
    }, [navigate]);

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('description', data.editDescription);
        formData.append('price', data.editPrice);
        formData.append('userId', data.userId);

        axios.post(`http://localhost:8000/api/edit/${id}`, data)
          .then(response => {
            console.log(response.data);
            navigate("/posts");
          })
          .catch(error => {
            console.error("Error: ", error);
          });
    }

  return (
    <div className={classes.main}>
      <NavBar user={userName}/>
      <form onSubmit={handleSubmit}>
          <h2>Edytuj ogłoszenie</h2>
          
          <h3>{editTitle}</h3>

          <h3>Opis</h3>
          <textarea name="editDescription" maxLength="512" value={data.editDescription} onChange={handleChange} ></textarea>

          <h3>Cena</h3>
          <input type="number" name="editPrice" value={data.editPrice} onChange={handleChange} required/> PLN<br/>

          <input type="submit" value="Edytuj ogłoszenie!" className={classes.submitForm}/><br/>

      </form>
    </div>
  );
}

export default AddPage;
