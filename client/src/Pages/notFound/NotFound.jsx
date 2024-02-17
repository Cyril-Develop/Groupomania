import './notFound.scss';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';

export default function NotFound() {

    return (
        <div className='not_found'>
            <div className='not_found_content'>
                <h1>OUPS!!!</h1>
                <div>
                    <p>404</p>
                    <span>La page que vous recherchez n'existe pas</span>
                </div>
                <p>Impossible d'afficher la page que vous recherchez...</p>
                <p>Vous pouvez retourner à l'accueil</p>
                <Link aria-label='Home page' to="/">
                    <KeyboardReturnIcon className='return_icon'/>
                </Link>
            </div>
        </div>
    )
};