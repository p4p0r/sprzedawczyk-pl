import React from 'react'
import './NavBar.module.css'
import classes from './NavBar.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function NavBar({user}) {

  const navigate=useNavigate()

  function logOut(){
    localStorage.clear();
    navigate("/")
  }

  return (
    <nav>
        <Link to="/addpost">
        <div className={classes.navItem}>
           Dodaj ogłoszenie
        </div>
        </Link>

        <Link to="/posts">
        <div className={classes.navItem}>
            Ogłoszenia
        </div>
        </Link>

        {/* <Link to={`/posts/${localStorage.getItem('userId')}`}>
        <div className={classes.navItem}>
            Moje ogłoszenia
        </div>
        </Link> */}
        
        <div className={classes.navItem} onClick={logOut}>
            Użytkownik: {user} (Wyloguj)
        </div>
    </nav>
  )
}

export default NavBar