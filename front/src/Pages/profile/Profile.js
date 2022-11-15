import './profile.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState, useEffect } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';

export default function Profile() {

	const {currentUser} = useContext(AuthContext);
	const token = currentUser.token;

	const {id} = useParams();
	let profileOwner = false;
	parseFloat(id) === currentUser.userId ? profileOwner = true : profileOwner = false;
	///////////////////////////////////////////////////////////////////////////////

	const [image, setImage] = useState(null);

	///////////////////////////////////////////////////////////////////////////////
	//Affichage profil utilisateur par rapport a l'identifiant de l'url
	//Ca c'est ok

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
	//Affichage des posts de l'utilisateur

	///////////////////////////////////////////////////////////////////////////////









	//Changement de photo de profil si l'utilisateur est le propriétaire du profil

	// const queryClient = useQueryClient();

	// const mutation = useMutation( (image) => {
	// 	if(profileOwner && image) {
	// 		const formImage = new FormData();
	// 		formImage.append('image', image);
	// 		return axios.put(`http://localhost:8080/api/user/${currentUser.userId}`, formImage, {
	// 			headers: {
	// 				'authorization': `bearer ${token}`
	// 			}
	// 		})
	// 	}},{
	// 	onSuccess: () => {
	// 	  // Invalidate and refetch
	// 	  queryClient.invalidateQueries(['user']);
	// 	},
	//   })

	// useEffect(() => {
	// 	mutation.mutate(image);
	// }, [image])
	

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
	}, [image]);

	return (
		<div className='profile'>
{error ? `Impossible d'afficher le profil...` : isLoading ? 'Chargement..' : 
			<div className='profile_card'>
				<div className="profile_card_head">
					<img src={profileOwner? currentUser.imageProfile : data.imageProfile} alt="avatar de profil"/>	
					{profileOwner &&				
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
}
			<ScrollToTop/>
		</div>	
	)
};
