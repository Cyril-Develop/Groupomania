import './post.scss'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

export default function posts({post}) {

    //const [toggleLike, setToggleLike] = useState(false);

  return (
    <div className='post'>
        <div className="post_header">
                <img src={post.profilePic} alt="" className="post_profilePic"/>
                <div className="post_header_info">
                    <span>{post.name}</span>
                    <span className='date'>il y a 10 secondes</span>
                </div>
                <MoreHorizIcon style={{marginLeft: "auto"}}/>
        </div>
        <div className="post_content">
            <h3>{post.title}</h3>
            <img src={post.img} alt="" />
            <p>{post.desc}</p>
        </div>
        <div className="post_footer">
            <FavoriteBorderIcon style={{cursor: 'pointer'}}/> 18 Likes
        </div>
    </div>
  )
}
