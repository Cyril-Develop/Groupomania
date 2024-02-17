import './home.scss';
import Posts from '../../components/posts/Posts';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';

export default function Home() {
	return (
		<main className='home'>
			<Posts />
			<ScrollToTop />
		</main>
	)
};
