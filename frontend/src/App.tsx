import './App.css'
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import ErrorPage from './pages/errorPage';
import Unauthorized from './components/unauthorized';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<ErrorPage />}>
			<Route 
				path='/login' 
				element={<LoginPage />}
			/>
			<Route
				path='/'
				element={
					<Unauthorized>
						<HomePage />
					</Unauthorized>
				}
			/>
		</Route>
	)
);

function App() {

  return (
		<AuthProvider>	
			<RouterProvider router={router} />
		</AuthProvider>
  )
}

export default App
