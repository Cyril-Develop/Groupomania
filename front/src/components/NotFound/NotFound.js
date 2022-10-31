import './NotFound.css';
import { useNavigate } from 'react-router';

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <div className='container-page'>
            <p>
                <span>4</span>
                <span>0</span>
                <span>4</span>
                <br />
                <span>P</span>
                <span>A</span>
                <span>G</span>
                <span>E</span>
                <span>N</span>
                <span>O</span>
                <span>T</span>
                <span>F</span>
                <span>O</span>
                <span>U</span>
                <span>N</span>
                <span>D</span>
            </p>
            <button className='btn-back' onClick={() => navigate('/Register')}>Retourner à l'accueil</button>
        </div>
    )
}
