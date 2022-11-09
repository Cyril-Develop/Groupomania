import './profile.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {

	const {currentUser} = useContext(AuthContext);

	const profilePicture = "http://localhost:8080/images/" + currentUser.imageUrl.split('/images/')[1];

	///////////////////////////////////////////////////////////////////////////////
	const token = currentUser.token;

	const [image, setImage] = useState(null);

	const handleFile = (e) => {
		let file = e.target.files[0];
		setImage(file);
	}
	
	useEffect(() => {
		if(image) {
			const formData = new FormData();
			formData.append('image', image);
			axios.put(`http://localhost:8080/api/user/${currentUser.userId}`, formData, {
				headers: {
					'authorization': `bearer ${token}`
				}
			})
			.then(res => {
				console.log(res);
				axios.get(`http://localhost:8080/api/user/${currentUser.userId}`,{headers: {'authorization': `bearer ${token}`}})
				.then(res => {
					const newCurrentUser = {...currentUser, imageUrl: res.data.imageUrl};
					localStorage.setItem('user', JSON.stringify(newCurrentUser));
					window.location.reload();
				})		
			})
			.catch(err => { 
				console.log(err);
			})
		}
	}, [image])

	return (
		<div className='profile'>
			<div className='profile_card'>
				<div className="profile_card_img">
					<img src={profilePicture} alt="avatar de profil" />					
				</div>
				<div className="profile_card_interaction">
					<label  htmlFor="picture">Modifier</label>		
					<input 
						type="file" 
						id="picture" 
						style={{display:"none"}}
						onChange={handleFile}
					/>
					<button>Supprimer</button>
				</div>		
			</div>
		</div>	
	)
}
