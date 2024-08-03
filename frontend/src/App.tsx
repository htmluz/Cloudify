import './App.css'
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import ErrorPage from './pages/errorPage';
import Unauthorized from './components/unauthorized';
import Protected from './components/protected';
import LogginIn from './pages/logginIn';

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
					<Protected>
						<HomePage />
					</Protected>
				}
			/>
			<Route
				path='/logginIn'
				element={<LogginIn />}
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
