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

    const profilePicture = "http://localhost:8080/images/" + currentUser.imageProfile.split('/images/')[1];

    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

    const navigate = useNavigate();

    const homePage = () => {
        navigate('/');
        setToggle(false);
    };

    const profilePage = () => {
        navigate(`/profile/${currentUser.userId}`);  
        setToggle(!toggle);
    };

	return (
        <header>
            <nav className='navbar'>
                <div className='navbar_left'>
                    <img onClick={homePage} src={Logo} alt="logo groupomania"/>
                    <div>
                        <input type="text" placeholder='Rechercher...'/>
                        <SearchIcon className="logo_search"/>
                    </div>
                </div>
                <div className="navbar_user">
                    <img onClick={handleToggle} src={profilePicture} alt="avatar de l'utilisateur" />
                        <div  className={toggle ? 'menu_table visible' : 'menu_table'}>
                            <div className="menu_table_item" onClick={profilePage}>
                                <Person2Icon/><Link to={`/profile/${currentUser.userId}`}>Profil</Link>
                            </div>
                            <div className="menu_table_item" onClick={handleLogout}>
                                <ExitToAppIcon/> Se déconnecter
                            </div>
                            <div className="menu_table_item">
                                <DeleteForeverIcon />Supprimer mon compte
                            </div>
                        </div>
                    <span>{currentUser.lastname} {currentUser.firstname}</span>	
                </div>
            </nav>
        </header>
	)
};
