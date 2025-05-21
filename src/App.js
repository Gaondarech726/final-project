import { Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import './index.scss';

import { store } from './redux/store';

import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from './pages/MainPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

export const App = () => {
	return (
		<Provider store={store}>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>

			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				transition={Bounce}
			/>
		</Provider>
	);
};
