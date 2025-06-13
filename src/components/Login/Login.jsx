import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import googleLogo from '../../img/google-logo.svg';
import loginBackgroundSecond from '../../img/login-background-second.svg';
import loginBackground from '../../img/login-background.svg';
import logo from '../../img/logo.svg';
import { clearError, logining, googleAuth } from '../../redux/authSlice';

import './Login.scss';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const currentUser = useSelector(state => state.auth.currentUser);
	const [logName, setLogName] = useState('');
	const [logPass, setLogPass] = useState('');

	useEffect(() => {
		const lastRegister = JSON.parse(localStorage.getItem('lastRegister'));
		if (lastRegister) {
			setLogName(lastRegister.username);
			setLogPass(lastRegister.password);
		}
	}, []);

	const error = useSelector(state => state.auth.error);

	useEffect(() => {
		if (error === 'Invalid data') {
			toast.error('Неправильний логін або пароль');
			dispatch(clearError());
		}
	}, [error, dispatch]);

	useEffect(() => {
		if (currentUser) {
			navigate('/start');
		}
	}, [currentUser, navigate]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(logining({ username: logName, password: logPass }));
	};

	const googleLogin = useGoogleLogin({
		async onSuccess(tokenResponse) {
			const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: {
					Authorization: `Bearer ${tokenResponse.access_token}`,
				},
			});

			const response = await res.json();

			dispatch(
				googleAuth({
					username: response.given_name,
					password: response.sub,
				})
			);

			navigate('../');
		},

		onError() {
			toast.error('Помилка авторизації');
		},
	});

	return (
		<div className='login-container'>
			<a href='./'>
				<img src={logo} alt='' className='login-container-logo' />
			</a>

			<img
				src={loginBackground}
				alt=''
				className='login-container-background'
			/>
			<img
				src={loginBackgroundSecond}
				alt=''
				className='login-container-background-second'
			/>

			<div className='login-title-container'>
				<h1>InvestIQ</h1>
				<h3>Smart Finance</h3>
			</div>
			<div className='login-form-container'>
				<form className='login-form' onSubmit={handleSubmit}>
					<div className='google-login'>
						<span>Ви можете авторизуватися за допомогою акаунта Google</span>
						<button
							type='button'
							onClick={() => {
								googleLogin();
							}}
						>
							<img src={googleLogo} alt='googleLogo' />
							<span>Google</span>
						</button>
					</div>

					<div className='email-login'>
						<span>
							Або увійти за допомогою ел. пошти та паролю після реєстрації
						</span>

						<div className='email-login-email'>
							<span>Електронна пошта:</span>
							<input
								type='email'
								placeholder='your@email.com'
								value={logName}
								onChange={e => setLogName(e.target.value)}
							/>
						</div>
						<div className='email-login-password'>
							<span>Пароль:</span>
							<input
								type='password'
								placeholder='••••••••'
								value={logPass}
								onChange={e => setLogPass(e.target.value)}
							/>
						</div>
					</div>

					<div className='form-submit-container'>
						<button className='login-btn' type='submit'>
							Увійти
						</button>
						<button
							type='button'
							className='register-btn'
							onClick={() => {
								navigate('/register');
							}}
						>
							реєстрація
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
