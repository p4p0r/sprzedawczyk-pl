import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './PostDetailPage.module.css'
import NavBar from '../components/NavBar';

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const[userId, setUserId]=useState(null);
  const[userName, setUserName]=useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    const storedUserName = localStorage.getItem('userName')

    if(storedUserId)
      setUserId(storedUserId)
    else{
        alert("Nie jesteś zalogowany!")
        navigate("/")}
    
    if(storedUserName)
      setUserName(storedUserName)
  }, []);
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/post/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  //bez tego nie dziala?????
  if (!post) return;

  let _category

  switch(post.category){
    case 'automotive':
      _category="Motoryzacja"
      break;
    case 'electronics':
      _category="Elektronika"
      break;
    case 'clothing':
      _category="Odzież, obuwe"
      break;
    case 'home':
      _category="Dom i ogród"
      break;
    case 'children':
      _category="Dla dzieci"
      break;
    case 'activity':
      _category="Sport, aktywność"
      break;
    default:
      _category="Inne"
      break;
  }

  return (
    <>
    <NavBar user={userName}/>
    <div className={classes.main}>
      <h1>{post.title}</h1>
      {post.image!="null" ? (<img className={classes.image} src={`http://localhost:8000/${post.image}`} alt={post.title}/>) : <h2>Nie dodano zdjęcia.</h2>}
      <h3>Lokalizacja: {post.location}</h3>
      <h3>Kategoria: {_category}</h3>
      <h2>Opis:</h2><p>{post.description}</p>
      <h3>Cena: {post.price} PLN</h3>
      <h2>Dodane przez:</h2>
      <h3>{post.username}</h3>
      {post.phone ? (<h3>{post.phone}</h3>) : ("Użytkownik nie podał numeru telefonu. ")}
      {post.email ? (<h3>{post.email}</h3>) : ("Użytkownik nie podał adresu e-mail.")}
    </div>
    </>
  );
}

export default PostDetailPage;