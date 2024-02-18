import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext } from 'react';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/connection/Login';
import Register from './Pages/connection/Register';
import Home from './Pages/home/Home';
import NotFound from './Pages/notFound/NotFound';
import Profile from './Pages/profile/Profile';
import Navbar from './components/navbar/Navbar';
import { AuthContext } from './context/authContext';

function App() {
	const { currentUser } = useContext(AuthContext);

	const queryClient = new QueryClient();

	const Layout = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<>
					<Navbar />
					<Outlet />
				</>
			</QueryClientProvider>
		)
	};

	const PrivateRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to='/groupomania/login/' />
		};
		return children
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<PrivateRoute>
					<Layout />
				</PrivateRoute>),
			children: [{ path: '/groupomania/', element: <Home /> }, { path: '/profile/:id/', element: <Profile /> }]
		},
		{ path: '/groupomania/login', element: <Login /> },
		{ path: '/groupomania/register', element: <Register /> },
		{ path: '*', element: <NotFound /> }
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
