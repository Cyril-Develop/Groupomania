import './NotFound.css';
import { useNavigate } from 'react-router';

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <div className='container-page'>
            <p>
                <span>404</span>
                <span>Page not found.</span>
            </p>
            {/* <button className='btn-back' onClick={() => navigate('/Register')}>Retourner à l'accueil</button> */}
            <a href="/register" onClick={() => navigate('/Register')}></a>
        </div>
    )
}
