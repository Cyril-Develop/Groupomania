import './notFound.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {

    return (
        <div className='container-page'>
            <p>
                <span>404</span>
                <span>Page not found.</span>
            </p>
            <Link to="/register"><span className='arrow'></span></Link>
        </div>
    )
}