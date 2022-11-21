import './comments.scss'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from "dayjs";
require("dayjs/locale/fr");
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function Comments({ post }) {

	const {currentUser} = useContext(AuthContext);
	const token = currentUser.token;

	const { isLoading, error, data } = useQuery(['comments'], () =>
		axios.get(`http://localhost:8080/api/post/${post.id}/comment`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
		.then(res => {
			return res.data; 
		})        
	);

	console.log(data);

	return (
		<div className='comments'>
			<div className="comments_create">
				<form>
					<label htmlFor="comment"><img src={currentUser.imageProfile} alt="" /></label>
					<input type="text" id='comment' placeholder="Ajouter un commentaire..." />
				</form>		
				<button type='submit'>Envoyer</button>
			</div>
			{data && data.map((comment) => (
				<div className="comments_content" key={comment.commentId}>
					<img src={comment.imageProfile} alt="" />
					<div className="comments_content_info">
						<div>
							<span>{comment.firstname} {comment.lastname}</span>
							<span className='date'>{dayjs(post.createdAt).locale("fr").fromNow()}</span>
						</div>
						<p>{comment.content}</p>
					</div>
					
				</div>
			))}
		</div>
	)
}
