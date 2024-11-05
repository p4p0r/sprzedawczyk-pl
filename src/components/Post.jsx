import classes from './Post.module.css'
import { Link } from 'react-router-dom'

export function Post({id, title, location, price, image, desc, remove}){

    function savePost(){
        console.log(id)
    }

    let _image=image

    if(image=="undefined" || image=="null" || image=="./null"){
        _image='./uploads/NO_IMAGE_PROVIDED.png'
    }

    console.log(image)

    return(
        <div className={classes.post}>
            <div className={classes.title}>
                <Link to={`/post/${id}`}>
                    {title}
                </Link>
                , {location}
                {remove==true ? {USUŃ} : ('')}
            </div>
            
            <div className={classes.image}>
                <img src={`http://localhost:8000/${_image}`} alt={title}/>
            </div>
            
            <div className={classes.desc}>
                {desc}
            </div>
            
            <div className={classes.price}>
                {price} PLN
            </div>

        </div>
    )
}