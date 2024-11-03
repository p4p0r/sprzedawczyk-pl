import classes from './Post.module.css'
import { Link } from 'react-router-dom'

export function Post({id, title, location, price, image, desc}){

    function savePost(){
        console.log(id)
    }

    return(
        <div className={classes.post}>
            <div className={classes.title}>
                <Link to={`/post/${id}`}>
                    {title}
                </Link>,
                {location}
            </div>
            
            <div className={classes.image}>
                <img src={`http://localhost:8000/${image}`} alt={title}/>
            </div>
            
            <div className={classes.desc}>
                {desc}
            </div>
            
            <div className={classes.price}>
                {price} PLN
                <span className={classes.save} onClick={savePost}>
                    Zapisz ogłoszenie
                </span>
            </div>

        </div>
    )
}