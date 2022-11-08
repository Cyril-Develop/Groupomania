import { createBrowserRouter, RouterProvider, Navigate, Outlet} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Home from './Pages/home/Home';
import Navbar from './components/navbar/Navbar';
import NotFound from './Pages/notFound/NotFound';
import Profile from './Pages/profile/Profile';

function App() {
	const {currentUser} = useContext(AuthContext);

	const Layout = () => {
		return (
			<>
				<Navbar/>
				<Outlet/>
			</>
		)
	};
	
	const PrivateRoute = ({children}) => {
		if(!currentUser){
			return <Navigate to='/login'/>
		};	
		return children
	};

	const router = createBrowserRouter([
		{path: '/', 
		element: (
			<PrivateRoute>
				<Layout/>
			</PrivateRoute>), 		
		children: [{path: '/', element: <Home/>}, {path: '/profile/:id', element: <Profile/>}]},
		{ path: '/login', element: <Login /> },
    	{ path: '/register', element: <Register /> },
		{ path: '*', element: <NotFound /> }
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
