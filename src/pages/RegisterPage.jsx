import React from 'react';
import classes from './LoginRegister.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import sha256 from 'sha256';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    registerUsername: '',
    registerPassword: '',
    registerPassword2: '',
    registerEmail: '',
    registerPhone: ''
  });
  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (data.registerPassword !== data.registerPassword2) {
      alert("Hasła się różnią!");
      return;
    }

    const hashedData = {
      ...data,
      registerPassword: sha256(data.registerPassword).toString(),
      registerPassword2: sha256(data.registerPassword2).toString(),
    };

    axios.post('http://localhost:8000/api/register', hashedData)
      .then(response => {
        setMessage(response.data);
        navigate("/");
      })
      .catch(error => {
        if (error.response) {
          setMessage(error.response.data);
        } else {
          setMessage('Server error');
        }
        console.error("ERROR: " + error);
      });
  }

  return (
    <div className={classes.main}>
      <header>Sprzedawczyk.pl</header>
      <form action="" method="post" onSubmit={handleSubmit}>
        <h2>Zarejestruj się</h2>

        <h3>Login</h3>
        <input
          type="text"
          name="registerUsername"
          minLength="4"
          maxLength="15"
          value={data.registerUsername}
          onChange={handleChange}
          required
        />

        <h3>Hasło</h3>
        <input
          type="password"
          name="registerPassword"
          minLength="8"
          maxLength="30"
          value={data.registerPassword}
          onChange={handleChange}
          required
        />

        <h3>Powtórz hasło</h3>
        <input
          type="password"
          name="registerPassword2"
          minLength="8"
          maxLength="30"
          value={data.registerPassword2}
          onChange={handleChange}
          required
        />

        <h3>Adres e-mail</h3>
        <input
          type="email"
          name="registerEmail"
          value={data.registerEmail}
          onChange={handleChange}
        />

        <h3>Numer telefonu</h3>
        <input
          type="tel"
          name="registerPhone"
          maxLength="9"
          value={data.registerPhone}
          onChange={handleChange}
        />

        <br />
        <button type="submit">Zarejestruj się!</button><br />
        <p>{message}</p>
        <span>Masz już konto? <Link to="/">Zaloguj się!</Link></span>
      </form>
    </div>
  );
}
