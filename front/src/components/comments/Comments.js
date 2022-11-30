import './comments.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
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

	const {error, isLoading, data } = useQuery(['comments', postId], () =>
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/${postId}/comment`, {
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
        return axios.post(`${process.env.REACT_APP_BASE_URL}/api/post/${postId}/comment`, newComment, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
    },{
        onSuccess: () => {
          queryClient.invalidateQueries( ['comments'] )
        },
    });

	const handleComment = (e) => {
		e.preventDefault();
		if (content) {
			mutation.mutate({content, postId});
			setContent("");
		}
	};

	const handleDelete = (commentId) => {
		axios.delete(`${process.env.REACT_APP_BASE_URL}/api/post/${commentId}/comment/`, {
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
			<form className='comments_form'>
				<div>
					< img src={currentUser.imageProfile} alt="Profil connecté" />
					<input 
						type="text" 
						id='comment' 
						placeholder="Ajouter un commentaire..." 
						aria-label='Write comment'
						maxLength={200}
						value={content}
						onChange={e => setContent(e.target.value)}
					/>
				</div>
				<button type='submit' onClick={handleComment}>Envoyer</button>
			</form>		
			<ul className="comments_list" >
				{error ? 'erreur' : isLoading ? 'chargement' : data.map((comment) => (
					<li className='comments_list_item' key={comment.commentId}>
						<div>
							<img src={comment.imageProfile} alt="Créateur du commentaire" />
							<Link role={'link'} to={`/profile/${comment.userId}`}>
								<span>{comment.firstname} {comment.lastname}</span>
							</Link>
						</div>
						<p>{comment.content}</p>
						<div className='info'>
							<span>{dayjs(comment.createdAt).locale("fr").fromNow()}</span> 
							{(comment.userId === currentUser.userId || currentUser.role === 'admin') && 
							<button 
								aria-label='Delete comment' 
								onClick={() => handleDelete(comment.commentId)}>
									<DeleteForeverIcon/>
							</button>}
						</div>	
					</li>			
				))}
			</ul>
		</div>
	)
};
