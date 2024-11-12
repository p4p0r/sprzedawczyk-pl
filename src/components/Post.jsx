import classes from './Post.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function Post({ id, title, location, price, image, desc, userId, currentUserId, isAdmin, onDelete }) {
    console.log('Post userId:', userId);
    console.log('Current userId:', currentUserId);
    console.log('Is Admin:', isAdmin);

    const isAuthorized = String(userId) === String(currentUserId) || isAdmin;
    console.log('Condition (userId === currentUserId || isAdmin):', isAuthorized);

    let _image = image;

    if (image === "undefined" || image === "null" || image === "./null") {
        _image = './uploads/NO_IMAGE_PROVIDED.png';
    }

    const handleDelete = () => {
        if (window.confirm('Czy na pewno chcesz usunąć ogłoszenie '+title+"?")) {
            axios.delete(`http://localhost:8000/api/post/${id}`, { data: { userId: currentUserId } })
                .then(response => {
                    onDelete(id);
                })
                .catch(error => {
                    console.error('Error deleting post:', error);
                    alert('Failed to delete post');
                });
        }
    };

    return (
        <div className={classes.post}>
            <div className={classes.title}>
                <Link to={`/post/${id}`}>
                    {title}
                </Link>, {location}
                {isAuthorized && (
                    <>
                        <span className={classes.remove} onClick={handleDelete}>Usuń</span>
                        <Link to={`/edit/${id}`}>
                        <span className={classes.remove} style={{backgroundColor:"green"}}>Edytuj</span>
                        </Link>
                    </>
                )}
            </div>

            <div className={classes.image}>
                <img src={`http://localhost:8000/${_image}`} alt={title} />
            </div>

            <div className={classes.desc}>
                {desc}
            </div>

            <div className={classes.price}>
                {price} PLN
            </div>
        </div>
    );
}
