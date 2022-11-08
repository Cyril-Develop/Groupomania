import './navbar.scss';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
	
export default function Navbar() {

	const {currentUser} = useContext(AuthContext);

	const profilePicture = "http://localhost:8080/images/" + currentUser.imageUrl.split('/images/')[1];

	const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

	return (
		<nav className='navbar'>
			<div className='navbar_left'>
				<Link to={'/'}><img src={Logo} alt="logo groupomania" /></Link>
				<input type="text" placeholder='Rechercher...'/>
				<FontAwesomeIcon icon={faMagnifyingGlass} className="logo_search"/>
			</div>
			<div className="navbar_user">
				<Link to={`/profile/${currentUser.userId}`}>
					<img src={profilePicture} alt="avatar de l'utilisateur" />
				</Link>
				<FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} className='logout'/>
			</div>
		</nav>
	)
};
