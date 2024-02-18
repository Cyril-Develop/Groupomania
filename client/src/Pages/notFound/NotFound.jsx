import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';
import './notFound.scss';

export default function NotFound() {

    return (
        <div className='not_found'>
            <div className='not_found_content'>
                <h1>OUPS!!!</h1>
                <div>
                    <p>404</p>
                    <span>La page que vous recherchez n'existe pas</span>
                </div>
                <Link aria-label='Home page' to="/groupomania/">
                    <KeyboardReturnIcon className='return_icon' />
                </Link>
            </div>
        </div>
    )
};