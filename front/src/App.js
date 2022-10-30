import { Routes, Route } from 'react-router-dom';
import Connection from './components/Connection/Connection';

function App() {
	return (
		<Routes>
			<Route path="/connection" element={<Connection />} />
		</Routes>
	);
}

export default App;
