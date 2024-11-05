import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import classes from './PostsPage.module.css'
import { Post } from '../components/Post'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

function PostsPage() {

  const navigate=useNavigate()

  const[userId, setUserId]=useState(null);
  const[userName, setUserName]=useState(null);
  const[posts, setPosts]=useState([])

  
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


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

  return (
    <>
      <NavBar user={userName}/>
        <SearchBar/>
        <div className={classes.postcontainer}>
        {posts.map(post => (
          <Post 
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            location={post.location}
            price={post.price}
            image={`./${post.image}`}
            desc={post.description}
          />
        ))}
      </div>  
    </>
  )
}

export default PostsPage