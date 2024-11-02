import React from 'react'
import './navBar.module.css'
import { Link } from 'react-router-dom'

function NavBar({user}) {
  return (
    <nav>
        <Link to="/addpost">
        <div>
           Dodaj ogłoszenie
        </div>
        </Link>

        <Link to="/savedposts">
        <div>
            Zapisane ogłoszenia
        </div>
        </Link>
        
        <Link to="/user">
        <div id='userMenu'>
            Użytkownik: {user}
        </div>
        </Link>
    </nav>
  )
}

export default NavBar