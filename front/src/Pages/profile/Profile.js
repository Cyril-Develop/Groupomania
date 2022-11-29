import './profile.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';
import ProfilePost from '../../components/profilePost/ProfilePost';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Profile() {

	const {currentUser} = useContext(AuthContext);
	const token = currentUser.token;

	const {id} = useParams();
	let profileOwner = false;
	parseFloat(id) === currentUser.userId ? profileOwner = true : profileOwner = false;
	///////////////////////////////////////////////////////////////////////////////
	
	const { data } = useQuery(['user'], () =>
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`, {
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
    const [errorFile, setErrorFile] = useState();

	useEffect(() => {
		if(profileOwner && image) {
			const formData = new FormData();
			formData.append('image', image);
			axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/${currentUser.userId}`, formData, {
				headers: {
					'authorization': `bearer ${token}`
				}
			})
			.then(res => {
				axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${currentUser.userId}`,{
					headers: {'authorization': `bearer ${token}`}
				})
				.then(res => {
					const newCurrentUser = {...currentUser, imageProfile: res.data.imageProfile};
					localStorage.setItem('user', JSON.stringify(newCurrentUser));
					window.location.reload();	
				})		
			})
			.catch(err => { 
				console.log(err);
                setErrorFile('Seul les images ne dépassant pas 500Ko sont autorisées');
			})	
		}
	}, [image , currentUser, token, profileOwner]);

	return (
		<header className='profile'>
			<div className='profile_card'>
				<div className="profile_card_head">
					{data && <img src={data.imageProfile} alt="avatar de profil"/>}	
					{(profileOwner || currentUser.role === 'admin') &&		
						<label htmlFor="picture">
                        	<AddPhotoAlternateIcon aria-label={'Change profile picture'}/>
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
						{profileOwner ? `${currentUser.firstname} ${currentUser.lastname}` : data && `${data.firstname} ${data.lastname}`} 						
					</h2>
                    {errorFile && <p className="error" >{errorFile}</p>}
				</div>		
			</div>

			<ProfilePost id={id} token={token} />
        
			<ScrollToTop/>
		</header>	
	)
};