import { useNavigate } from 'react-router';

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Page 404</h1>
            <button onClick={() => navigate('/Register')}>Retourner à l'accueil</button>
        </div>
    )
}
