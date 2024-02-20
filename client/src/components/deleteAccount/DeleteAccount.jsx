import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './deleteAccount.scss';

export default function DeleteAccount({ setModalDelete }) {

    const closeModal = () => {
        setModalDelete(false);
    };

    const { currentUser } = useContext(AuthContext);
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
                    <div className="delete_info_text">
                        <p>Êtes-vous certain de vouloir supprimer votre compte ?</p>
                        <p>Aucune information ne sera enregistrée.</p>
                    </div>
                    <div className="delete_info_btn">
                        <button onClick={closeModal}><BlockIcon />Annuler</button>
                        <button onClick={deleteAccount}><DoneIcon /> Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
