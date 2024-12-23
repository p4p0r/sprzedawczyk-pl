import classes from './LoginRegister.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import sha256 from 'sha256'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userId') !== null) {
      navigate('/posts');
    }
  }, []);

  const [data, setData] = useState({
    loginUsername: '',
    loginPassword: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const hashedData = {
      ...data,
      loginPassword: sha256(data.loginPassword).toString(),
    };

    axios.post('http://localhost:8000/api/login', hashedData)
      .then(response => {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('isAdmin', response.data.isAdmin ? 'true' : 'false');
        navigate('/posts');
      })
      .catch(error => {
        console.log("ERROR: " + error);
        switch(error.response.status){
          case 404:
            alert("Nie znaleziono takiego użytkownika");
            break;
          case 401:
            alert("Nieprawidłowe hasło");
            break;
          case 500:
            alert("Błąd bazy danych");
            break;
        }
          
      });
  }

  return (
    <div className={classes.main}>
      <header>Sprzedawczyk.pl</header>
      <form action="" method="post" onSubmit={handleSubmit}>
        <h2>Zaloguj</h2>

        <h3>Login</h3>
        <input type="text" name="loginUsername" value={data.loginUsername} onChange={handleChange} />

        <h3>Hasło</h3>
        <input type="password" name="loginPassword" value={data.loginPassword} onChange={handleChange} /><br/>

        <button>Zaloguj</button><br/>
        <span>Nie masz konta? <Link to="/register">Zarejestruj się!</Link></span>
      </form>
    </div>
  );
}

export default LoginPage;