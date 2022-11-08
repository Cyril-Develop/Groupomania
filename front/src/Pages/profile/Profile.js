import './profile.scss';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

export default function Profile() {

	const {currentUser} = useContext(AuthContext);

	const profilePicture = "http://localhost:8080/images/" + currentUser.imageUrl.split('/images/')[1];

	console.log(currentUser);

	return (
		<div className='profile'>
			<div className='profile_card'>
				<img src={profilePicture} alt="" />
				<div className='profile_card_info'>
					<p>{currentUser.lastname}</p>
					<p>{currentUser.firstname}</p>
				</div>
				<button>Modifier</button>
				<button>Supprimer</button>
			</div>
		</div>

		
	)
}
