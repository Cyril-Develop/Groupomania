import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePost from '../../components/profilePost/ProfilePost';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';
import { AuthContext } from '../../context/authContext';
import './profile.scss';

export default function Profile() {

	const { currentUser } = useContext(AuthContext);
	const token = currentUser.token;
	const [currentUserRole, setCurrentUserRole] = useState();

	const { id } = useParams();
	let profileOwner = false;
	parseFloat(id) === currentUser.userId ? profileOwner = true : profileOwner = false;

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/${currentUser.userId}`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
			.then(res => {
				setCurrentUserRole(res.data.role);
			})
	}, [token, currentUser.userId]);


	const { data } = useQuery(['user', id], () =>
		axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/${id}`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
			.then(res => {
				return res.data;
			})
	);

	const [image, setImage] = useState(null);
	const [errorFile, setErrorFile] = useState();

	useEffect(() => {
		if (profileOwner && image) {
			const formData = new FormData();
			formData.append('image', image);
			axios.put(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/${currentUser.userId}`, formData, {
				headers: {
					'authorization': `bearer ${token}`
				}
			})
				.then(res => {
					axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/${currentUser.userId}`, {
						headers: { 'authorization': `bearer ${token}` }
					})
						.then(res => {
							const newCurrentUser = { ...currentUser, imageProfile: res.data.imageProfile };
							localStorage.setItem('user', JSON.stringify(newCurrentUser));
							window.location.reload();
						})
				})
				.catch(err => {
					console.log(err);
					setErrorFile('Seul les images ne dépassant pas 500Ko sont autorisées');
				})
		}
	}, [image, currentUser, token, profileOwner]);

	return (
		<header className='profile'>
			<div className='profile_card'>
				<div className="profile_card_head">
					{data && <img src={data.imageProfile} alt="avatar de profil" />}
					{(profileOwner || currentUserRole === 'admin') &&
						<label htmlFor="picture" title="Modifier la photo">
							<AddPhotoAlternateIcon aria-label={'Change profile picture'} />
						</label>
					}
					<input
						type="file"
						id="picture"
						style={{ display: "none" }}
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

			<ProfilePost id={id} token={token} currentUserRole={currentUserRole} />

			<ScrollToTop />
		</header>
	)
};