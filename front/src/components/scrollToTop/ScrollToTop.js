import './scrollToTop.scss'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useEffect } from 'react';

export default function ScrollToTop() {

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                document.querySelector('.scrollToTop').classList.add('active');
            } else {
                document.querySelector('.scrollToTop').classList.remove('active');
            }
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button 
            aria-label='Top page' 
            type="button" 
            rel="nofollow" 
            title='Haut de page'
            onClick={scrollToTop} 
            className='scrollToTop'>
            <KeyboardDoubleArrowUpIcon />
        </button>
    )
}
