import './profile.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState, useEffect } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import Logo from '../../assets/logo-groupo.svg'
import { useParams } from 'react-router-dom';
import ProfilePost from '../../components/profilePost/ProfilePost';
import { useQuery } from '@tanstack/react-query';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';

export default function Profile() {

	const {currentUser} = useContext(AuthContext);
	const token = currentUser.token;

	const {id} = useParams();
	let profileOwner = false;
	parseFloat(id) === currentUser.userId ? profileOwner = true : profileOwner = false;
	///////////////////////////////////////////////////////////////////////////////
	
	const { isLoading, error, data } = useQuery(['user'], () =>
		axios.get(`http://localhost:8080/api/user/${id}`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
		.then(res => {
			return res.data; 
		})        
	);
	
	///////////////////////////////////////////////////////////////////////////////
	//Modification image de profil
	const [image, setImage] = useState(null);

	useEffect(() => {
		if(profileOwner && image) {
			const formData = new FormData();
			formData.append('image', image);
			axios.put(`http://localhost:8080/api/user/${currentUser.userId}`, formData, {
				headers: {
					'authorization': `bearer ${token}`
				}
			})
			.then(res => {
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
	}, [image]);

	return (
		<div className='profile'>
			<div className='profile_card'>
				<div className="profile_card_head">
					<img src={profileOwner? currentUser.imageProfile : data.imageProfile} alt="avatar de profil"/>	
					{(profileOwner || currentUser.role === 'admin') &&				
						<label htmlFor="picture" >
                        	<AddPhotoAlternateIcon/>
                    	</label>	
					}	
					<input 
						type="file" 
						id="picture" 
						style={{display:"none"}}
						onChange={e => setImage(e.target.files[0])}
					/>
				</div>
				<div className="profile_card_infos">
                    <h2>
						{profileOwner ? currentUser.lastname  : data.lastname} {profileOwner ? currentUser.firstname : data.firstname} 						
					</h2>
				</div>		
			</div>

        {error ? <img src={Logo} alt="logo groupomania"/> : isLoading ? 'Chargement...' : 
			<ProfilePost id={id} token={token} />
        }
			<ScrollToTop/>
		</div>	
	)
};