import './comments.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function Comments({ postId }) {

	const {currentUser} = useContext(AuthContext);
	const token = currentUser.token;

	const { data } = useQuery(['comments'], () =>
		axios.get(`http://localhost:8080/api/post/${postId}/comment`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
		.then(res => {
			return res.data; 
		})        
	);

	const queryClient = useQueryClient();
	const [content, setContent] = useState("");
		
	const mutation = useMutation((newComment) => {
        return axios.post(`http://localhost:8080/api/post/${postId}/comment`, newComment, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
    },{
        onSuccess: () => {
          queryClient.invalidateQueries( ['comments'] )
        },
    });

	const handleComment = () => {
		if (content) {
			mutation.mutate({content, postId});
			setContent("");
		}
	};

	const handleDelete = (commentId) => {
		axios.delete(`http://localhost:8080/api/post/${commentId}/comment/`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
		.then(() => {
			queryClient.invalidateQueries( ['comments'] )
		})
	};

	return (
		<div className='comments'>
			<div className="comments_create">
				<form>
					<label htmlFor="comment"><img src={currentUser.imageProfile} alt="" /></label>
					<input 
						type="text" 
						id='comment' 
						placeholder="Ajouter un commentaire..." 
						value={content}
						onChange={e => setContent(e.target.value)}
					/>
				</form>		
				<button type='submit' onClick={handleComment}>Envoyer</button>
			</div>
			{data && data.map((comment) => (
				<div className="comments_content" key={comment.commentId}>
					<img src={comment.imageProfile} alt="" />
					<div className="comments_content_info">
						<div>
							<Link role={'link'} to={`/profile/${comment.userId}`}>
								<span>{comment.firstname} {comment.lastname}</span>
							</Link>
							<div className='date'>
								{dayjs(comment.createdAt).locale("fr").fromNow()}
								<button onClick={() =>handleDelete(comment.commentId)}><DeleteForeverIcon/></button>
							</div>
						</div>
						<p>{comment.content}</p>
					</div>			
				</div>
			))}
		</div>
	)
};
