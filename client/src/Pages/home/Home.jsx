import Posts from '../../components/posts/Posts';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';
import './home.scss';

export default function Home() {
	return (
		<main className='home'>
			<Posts />
			<ScrollToTop />
		</main>
	)
};
