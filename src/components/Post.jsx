import './post.css'

export function Post({title, location, price, image, desc}){
    return(
        <div className="post">
            <div className="title">{title}, {location}</div>
            <div className="image"><img src={image} alt={title}/></div>
            <div className="desc">{desc}</div>
            <div className="price">{price} PLN</div>
        </div>
    )
}