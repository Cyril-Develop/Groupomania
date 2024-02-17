import './deleteAccount.scss'
import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

export default function DeleteAccount({ setModalDelete}) {

    const closeModal = () => {
        setModalDelete(false);
    };

    const {currentUser} = useContext(AuthContext);
    const token = currentUser.token;

    const deleteAccount = () => {
        axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/${currentUser.userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            localStorage.removeItem('user');
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <div className='delete_modal'>
            <div className="delete_modal_content">
                <div className="delete_info">
                    <p>Êtes-vous certain de vouloir supprimer votre compte ?</p>
                    <p>Aucune information ne sera enregistrée.</p>
                    <div>
                        <button onClick={closeModal}><BlockIcon/>Annuler</button>
                        <button onClick={deleteAccount}><DoneIcon/> Supprimer</button>
                    </div>    
                </div>             
            </div> 
        </div>
    )
};
