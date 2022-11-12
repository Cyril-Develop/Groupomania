import './post.scss'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function posts({post}) {

  return (
    <div className='post'>
        <div className="post_header">
                <img src={post.imageProfile} alt="" className="post_profilePic"/>
                <div className="post_header_info">
                    <span>{post.firstname} {post.lastname}</span>
                    <span className='date'>il y a 10 secondes</span>
                </div>
                <MoreHorizIcon style={{marginLeft: "auto"}}/>
        </div>
        <div className="post_content">
            <h3>{post.title}</h3>
            <img src={post.imagePost} alt="" />
            <p>{post.content}</p>
        </div>
        <div className="post_footer">
            <FavoriteBorderIcon style={{cursor: 'pointer'}}/> 18 Likes
        </div>
    </div>
  )
}

