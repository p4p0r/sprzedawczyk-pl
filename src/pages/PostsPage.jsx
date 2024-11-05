import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import classes from './PostsPage.module.css';
import { Post } from '../components/Post';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function PostsPage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

    console.log(`Stored userId: ${storedUserId}`);
    console.log(`Stored userName: ${storedUserName}`);
    console.log(`Stored isAdmin: ${storedIsAdmin}`);

    if (storedUserId) {
      setUserId(storedUserId);
      setIsAdmin(storedIsAdmin);
      setUserName(storedUserName);
    }
    else {
      alert("Nie jesteś zalogowany!");
      navigate("/");
    }

  }, []);

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.post_id !== postId));
  };

  return (
    <>
      <NavBar user={userName} />
      <SearchBar setSearchResults={setPosts} />
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
            userId={post.user_id}
            currentUserId={userId}
            isAdmin={isAdmin}
            onDelete={handleDelete}
          />
        ))}
      </div>  
    </>
  );
}

export default PostsPage;