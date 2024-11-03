import React from 'react'
import './NavBar.module.css'
import classes from './NavBar.module.css'
import { Link } from 'react-router-dom'

function NavBar({user}) {
  return (
    <nav>
        <Link to="/addpost">
        <div className={classes.navItem}>
           Dodaj ogłoszenie
        </div>
        </Link>

        <Link to="/savedposts">
        <div className={classes.navItem}>
            Zapisane ogłoszenia
        </div>
        </Link>
        
        <Link to="/user">
        <div className={classes.navItem}>
            Użytkownik: {user}
        </div>
        </Link>
    </nav>
  )
}

export default NavBar