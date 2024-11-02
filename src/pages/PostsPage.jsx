import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import classes from './PostsPage.module.css'
import { Post } from '../components/Post'


function PostsPage() {

  const[userId, setUserId]=useState(null);
  const[userName, setUserName]=useState(null);

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
        <Post title="samochut" location="korczyna" desc={"opel astra nie bity przebieg 200tys.  nie cofany"} price="2000" image={"https://picsum.photos/200"}/>
        <Post title="samochut" location="korczyna" desc={"opel astra nie bity przebieg 200tys.  nie cofany"} price="2000" image={"https://picsum.photos/199"}/>
        <Post title="samochut" location="korczyna" desc={"opel astra nie bity przebieg 200tys.  nie cofany"} price="2000" image={"https://picsum.photos/201"}/>
      </div>
    </>
  )
}

export default PostsPage