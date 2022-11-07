import './navbar.scss';
import Logo from '../../assets/groupo-nav.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
	
export default function Navbar() {

	const {currentUser} = useContext(AuthContext);

	console.log(currentUser);

	const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	}

	return (
		<nav className='navbar'>
			<div className='navbar_logo'>
				<Link to={'/'}><img src={Logo} alt="logo groupomania" /></Link>
			</div>
			<div className="navbar_user">
				<img src='http://localhost:8080/images/profilePictures/defaultPicture.jpg' alt="avatar de l'utilisateur" />
				<FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} className='logout'/>
			</div>
		</nav>
	)
}
