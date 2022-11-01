import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import NotFound from './Pages/notFound/NotFound';


function App() {

	const router = createBrowserRouter([
		{ path: '/login', element: <Login /> },
    	{ path: '/register', element: <Register /> },
		{ path: '/', element: <Navigate replace to="/register" /> },
		{ path: '*', element: <NotFound /> }
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
