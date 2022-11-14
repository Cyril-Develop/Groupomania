import './post.scss'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function Posts({ post }) {

	const {currentUser} = useContext(AuthContext);
	const token = currentUser.token;
	const user = currentUser.userId;

	const { isLoading, error, data } = useQuery(['likes', post.id], () =>
		axios.get(`http://localhost:8080/api/post/${post.id}/like`, {
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
        return axios.post(`http://localhost:8080/api/post/${post.id}/like`, user, {
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
{isLoading ? 'chargement' :
			<div className="post_footer">
				{data.includes(currentUser.userId) ? 
					<FavoriteOutlinedIcon style={{ cursor: 'pointer', color:'crimson' }} onClick={handleLike} /> : 
					<FavoriteBorderOutlinedIcon style={{ cursor: 'pointer' }} onClick={handleLike} />} 
				{data.length} Likes  
			</div>
}
		</div>
	)
};

