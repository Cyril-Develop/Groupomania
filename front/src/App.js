import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';


function App() {



	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/" element={<Navigate replace to="/register" />} />
			<Route path='*' element={<NotFound />}/>
		</Routes>
	);
}

export default App;
