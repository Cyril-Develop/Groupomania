import './post.scss'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentIcon from '@mui/icons-material/Comment';
import Comments from '../comments/Comments';
import MenuPost from '../menuPost/MenuPost';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function Posts({ post }) {

	const [modalMenu, setModalMenu] = useState(false);

	const {currentUser} = useContext(AuthContext);
	const token = currentUser.token;
	const user = currentUser.userId;

	const { isLoading, error, data } = useQuery(['likes', post.id], () =>
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/${post.id}/like`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
		.then(res => {
			return res.data; 
		})        
	);

	const queryClient = useQueryClient();
		
	const mutation = useMutation(() => {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/api/post/${post.id}/like`, user, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
    },{
        onSuccess: () => {
          queryClient.invalidateQueries( ['likes'] )
        },
    });

	const handleLike = () => {
		mutation.mutate();
	};

	const [showComments, setShowComments] = useState(false);

	return (
		<article className='post'>
			<div className="post_header">
				<img src={post.imageProfile} alt="" className="post_profilePic" />
				<div className="post_header_info">
					<Link role={'link'} to={`/profile/${post.userId}`}>
						<h2>{post.firstname} {post.lastname}</h2>
					</Link>
					<span className='date'>{dayjs(post.createdAt).locale("fr").fromNow()}</span>
				</div>
				
				{(post.userId === currentUser.userId || currentUser.role === 'admin') &&
				 	<button className='post_header_btn' aria-label='Show menu' onClick={() => setModalMenu(!modalMenu)}>
						<MoreHorizIcon/>
					</button>
				}	
				{modalMenu && <div className="post_header_menu"><MenuPost post={post} setModalMenu={setModalMenu}/></div>}
			</div>
			<div className="post_content">
				<h3>{post.title}</h3>
				{post.imagePost && <img src={post.imagePost} alt="Illustration publication Groupomania" />} 
				<p>{post.content}</p>
			</div>
			{error ? 
			'Erreur de chargement' : 
			isLoading ? 'Chargement' :
			<div className="post_footer">
				<div>
					<button className='post_footer_btn' aria-label='Like this post' onClick={handleLike}>
						{data.includes(currentUser.userId) ? 
							<FavoriteOutlinedIcon style={{color:'crimson'}}/> : 
							<FavoriteBorderOutlinedIcon/>} 
					</button> 
					{data.length > 1 ? `${data.length} Likes` : `${data.length} Like`} 
				</div>	
				<div>
					<button className='post_footer_btn' aria-label='View comments' onClick={() => setShowComments(!showComments)}>
						<CommentIcon/> 
					</button>
					Commenter
				</div>
			</div>
			}
			{showComments && <Comments postId={post.id} />} 
		</article>
	)
};

