import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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
    <div>
      <h1>{post.title}</h1>
      {post.image!="undefined" ? (<img src={`http://localhost:8000/${post.image}`} alt={post.title}/>) : <h2>Nie dodano zdjęcia.</h2>}
      <h3>Lokalizacja: {post.location}</h3>
      <h3>Kategoria: {_category}</h3>
      <h2>Opis:</h2><p>{post.description}</p>
      <h3>Cena: {post.price} PLN</h3>
      <h2>Dodane przez:</h2>
      <h3>{post.username}</h3>
      {post.phone ? (<h3>{post.phone}</h3>) : ("Użytkownik nie podał numeru telefonu."+<br/>)}
      {post.email ? (<h3>{post.email}</h3>) : ("Użytkownik nie podał adresu e-mail."+<br/>)}
    </div>
  );
}

export default PostDetailPage;