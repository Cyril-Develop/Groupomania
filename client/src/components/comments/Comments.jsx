import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './comments.scss';
dayjs.extend(relativeTime);

export default function Comments({ postId, currentUserRole }) {

	const { currentUser } = useContext(AuthContext);
	const token = currentUser.token;

	const { error, isLoading, data } = useQuery({
		queryKey: ['comments', postId],
		queryFn: async () => {
			const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/post/${postId}/comment`, {
				headers: {
					'authorization': `bearer ${token}`
				}
			})
			return res.data;
		}
	})

	const queryClient = useQueryClient();
	const [content, setContent] = useState("");

	const { mutate } = useMutation({
		mutationFn: (newComment) => {
			return axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/post/${postId}/comment`, newComment, {
				headers: {
					'authorization': `bearer ${token}`
				}
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['comments'])
		},
	});

	const handleComment = (e) => {
		e.preventDefault();
		if (content) {
			mutate({ content });
			setContent("");
		}
	};

	const handleDelete = (commentId) => {
		axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/post/${commentId}/comment/`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
			.then(() => {
				queryClient.invalidateQueries(['comments'])
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
							{(comment.userId === currentUser.userId || currentUserRole === 'admin') &&
								<button
									aria-label='Delete comment'
									onClick={() => handleDelete(comment.commentId)}>
									<DeleteForeverIcon />
								</button>}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
};
