import './navbar.scss';
import Person2Icon from '@mui/icons-material/Person2';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchUser from '../searchUser/SearchUser';
import DeleteAccount from '../deleteAccount/DeleteAccount';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
	
export default function Navbar() {

	const {currentUser} = useContext(AuthContext);
    
    const profilePicture = currentUser.imageProfile;

    const [menuToggle, setMenuToggle] = useState(false);

    const handleToggle = () => {
        setMenuToggle(!menuToggle);
        setModalDelete(false);
    };

    const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

    const homePage = () => {
        setMenuToggle(false);
    };

    const profilePage = () => {
        setMenuToggle(!menuToggle);
    };

    const [modalDelete, setModalDelete] = useState(false);

    const handleDelete = () => {
        setModalDelete(!modalDelete);
        setMenuToggle(false);
    };

	return (
        <header>
            <nav className='navbar'>
                <div className='navbar_left'>
                    <h1>
                        <Link role={'link'} to={`/`}>
                            <img onClick={homePage} title="Accueil" src={Logo} alt="Groupomania - réseau social"/>
                        </Link>  
                    </h1>
                    <SearchUser/>
                </div>
                <div className="navbar_user">
                    <button type='button' onClick={handleToggle} title="Menu">
                        <img src={profilePicture} alt="avatar de l'utilisateur" />
                    </button>
                    <ul className={menuToggle ? 'menu_table visible' : 'menu_table'}>
                        <li >
                            <Link role={'link'} onClick={profilePage} className="menu_table_item" to={`/profile/${currentUser.userId}`}>
                                <Person2Icon/>Profil
                            </Link>
                        </li>
                        <li>
                            <Link role={'link'} onClick={handleLogout} className="menu_table_item">
                                <ExitToAppIcon/> Se déconnecter
                            </Link>    
                        </li>
                        <li>
                            <Link onClick={handleDelete} className="menu_table_item">
                                <DeleteForeverIcon/>Supprimer mon compte
                            </Link>
                        </li>
                    </ul>
                    <span>{currentUser.firstname} {currentUser.lastname}</span>	
                </div>
            </nav>
            {modalDelete && <DeleteAccount setModalDelete={setModalDelete}/> } 
        </header>
	)
};
