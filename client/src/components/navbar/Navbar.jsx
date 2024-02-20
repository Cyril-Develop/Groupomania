import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Person2Icon from '@mui/icons-material/Person2';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { AuthContext } from '../../context/authContext';
import DeleteAccount from '../deleteAccount/DeleteAccount';
import SearchUser from '../searchUser/SearchUser';
import './navbar.scss';

export default function Navbar() {

    const { currentUser } = useContext(AuthContext);

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
                    <Link role={'link'} to={`/groupomania/`} title="Accueil">
                        <h1><img onClick={homePage} src={Logo} alt="Groupomania - réseau social" /><span>Groupomania</span></h1>
                    </Link>
                    <SearchUser />
                </div>
                <div className="navbar_user">
                    <button className="navbar_user_btn" type='button' onClick={handleToggle} title="Menu">
                        <img src={profilePicture} alt="avatar de l'utilisateur" />
                    </button>
                    <ul className={menuToggle ? 'menu_table visible' : 'menu_table'}>
                        <li >
                            <Link role={'link'} onClick={profilePage} className="menu_table_item" to={`/groupomania/profile/${currentUser.userId}`}>
                                <Person2Icon />Profil
                            </Link>
                        </li>
                        <li>
                            <Link role={'link'} onClick={handleLogout} className="menu_table_item">
                                <ExitToAppIcon /> Se déconnecter
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleDelete} className="menu_table_item">
                                <DeleteForeverIcon />Supprimer mon compte
                            </button>
                        </li>
                    </ul>
                    <p>{currentUser.firstname} {currentUser.lastname}</p>
                </div>
            </nav>
            {modalDelete && <DeleteAccount setModalDelete={setModalDelete} />}
        </header>
    )
};
