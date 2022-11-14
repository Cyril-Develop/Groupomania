import './post.scss'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function posts({ post }) {


	const liked = false;

	return (
		<div className='post'>
			<div className="post_header">
				<img src={post.imageProfile} alt="" className="post_profilePic" />
				<div className="post_header_info">
					<Link to={`/profile/${post.userId}`}>
						<span>{post.firstname} {post.lastname}</span>
					</Link>
					<span className='date'>{dayjs(post.createdAt).locale("fr").fromNow()}</span>
				</div>
				<MoreHorizIcon style={{ marginLeft: "auto" }} />
			</div>
			<div className="post_content">
				<h3>{post.title}</h3>
				<img src={post.imagePost} alt="" />
				<p>{post.content}</p>
			</div>
			<div className="post_footer">
				{liked ? <FavoriteOutlinedIcon style={{ cursor: 'pointer', color:'crimson' }}/> : <FavoriteBorderOutlinedIcon style={{ cursor: 'pointer' }}/>} 18 Likes
			</div>
		</div>
	)
}

