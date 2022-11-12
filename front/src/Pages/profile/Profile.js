import './profile.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState, useEffect } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';

export default function Profile() {

	const {currentUser} = useContext(AuthContext);

	const profilePicture = "http://localhost:8080/images/" + currentUser.imageProfile.split('/images/')[1];

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
					const newCurrentUser = {...currentUser, imageProfile: res.data.imageProfile};
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
				<div className="profile_card_head">
					<img src={profilePicture} alt="avatar de profil"/>					
					<label htmlFor="picture" >
                        <AddPhotoAlternateIcon/>
                    </label>		
					<input 
						type="file" 
						id="picture" 
						style={{display:"none"}}
						onChange={handleFile}
					/>
				</div>
				<div className="profile_card_infos">
                    <h2>{currentUser.lastname} {currentUser.firstname}</h2>
				</div>		
			</div>
		</div>	
	)
}
