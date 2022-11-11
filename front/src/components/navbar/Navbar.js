import './navbar.scss';
import Logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Person2Icon from '@mui/icons-material/Person2';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
	
export default function Navbar() {

	const {currentUser} = useContext(AuthContext);

    const profilePicture = "http://localhost:8080/images/" + currentUser.imageUrl.split('/images/')[1];

    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
        console.log(toggle);
    };

    const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

    const navigate = useNavigate();

    const profilePage = () => {
        navigate(`/profile/${currentUser.userId}`);   
        setToggle(!toggle);
    };

	return (
		<nav className='navbar'>
			<div className='navbar_left'>
				<Link to={'/'}><img src={Logo} alt="logo groupomania"/></Link>
                <div>
                    <input type="text" placeholder='Rechercher...'/>
                    <SearchIcon className="logo_search"/>
                </div>
			</div>
			<div className="navbar_user">
                <img onClick={handleToggle} src={profilePicture} alt="avatar de l'utilisateur" />
                <div className={toggle ? 'menu visible' : 'menu'}>
                    <div className="menu_item" onClick={profilePage}>
                        <Person2Icon/><Link to={`/profile/${currentUser.userId}`}>Profil</Link>
                    </div>
                    <div className="menu_item" onClick={handleLogout}>
                        <ExitToAppIcon/> Se déconnecter
                    </div>
                    <div className="menu_item">
                        <DeleteForeverIcon />Supprimer mon compte
                    </div>
                </div>
                <span>{currentUser.lastname} {currentUser.firstname}</span>	
			</div>
		</nav>
	)
};
