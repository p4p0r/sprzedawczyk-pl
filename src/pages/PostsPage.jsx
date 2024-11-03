import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import classes from './PostsPage.module.css'
import { Post } from '../components/Post'
import axios from 'axios'

function PostsPage() {

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
    const storedUserName=localStorage.getItem('userName')
    if(storedUserId)   setUserId(storedUserId)
    if(storedUserName)  setUserName(storedUserName)
  }, []);


  const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel libero nec quam luctus consectetur. In mattis vestibulum rutrum. Quisque sit amet purus tortor. Mauris ac augue placerat libero volutpat rhoncus a in nisi. Duis ut ex fringilla, mattis nisi ut, viverra arcu. Maecenas nec arcu a velit aliquet finibus. Vivamus ut ligula at nibh auctor mattis. Etiam et dictum magna, a accumsan tellus."

  return (
    <>
      <NavBar user={userName}/>
      <div className={`${classes.postcontainer}`}>
      {posts.map(post => (
          <Post 
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            location={post.location}
            price={post.price}
            image={post.image}
            desc={post.description}
          />
        ))}
      </div>
    </>
  )
}

export default PostsPage