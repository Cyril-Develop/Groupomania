import './navbar.scss';
import Logo from '../../assets/groupo-nav.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav className='navbar'>
			<div className='navbar_logo'>
				<Link to={'/'}><img src={Logo} alt="logo groupomania" /></Link>
			</div>
		</nav>
	)
}
