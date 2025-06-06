import './Register.scss';
import logo from '../../img/logo.svg';
import googleLogo from '../../img/google-logo.svg';
import loginBackground from '../../img/login-background.svg';
import loginBackgroundSecond from '../../img/login-background-second.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, logining } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [regName, setRegName] = useState('');
	const [regPass, setRegPass] = useState('');
	let users = useSelector(state => state.auth.users);
	let error = useSelector(state => state.auth.error);

	let usersBeforeRegister = useRef(null);

	const isValidEmail = async email => {
		const apiKey = '6cd2f04760db46df9b9b71f25d1eaa74';
		const response = await fetch(
			`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
		);
		const data = await response.json();

		if (data.deliverability === 'DELIVERABLE') {
			return true;
		} else {
			return false;
		}
	};

	// відправка форми, додавання юзера
	const handleSubmit = async e => {
		e.preventDefault();
		usersBeforeRegister.current = users.length;

		const isValid = await isValidEmail(regName);

		if (isValid) {
			dispatch(register({ username: regName, password: regPass }));
			document.querySelector('.register-input-error').style.display = 'none';
		} else {
			document.querySelector('.register-input-error').style.display = 'block';
			document.querySelector('.register-input-error').innerHTML =
				'Введіть існуючий email';
		}
		if (regName.length < 1) {
			document.querySelector('.register-input-error').style.display = 'block';
			document.querySelector('.register-input-error').innerHTML =
				'це обов’язкове поле';
		}

		if (regPass.length < 8) {
			document.querySelector('.register-input-pass-error').style.display =
				'block';
		} else {
			document.querySelector('.register-input-pass-error').style.display =
				'none';
		}
	};

	// обробка помилок, успішна рега
	useEffect(() => {
		if (
			usersBeforeRegister.current !== null &&
			users.length > usersBeforeRegister.current
		) {
			toast.success('Успішна реєстрація');
			navigate('../login');

			document.querySelector('.register-input-pass').value = '';
			document.querySelector('.register-input-email').value = '';
		}
	}, [users, error, usersBeforeRegister, navigate]);

	useEffect(() => {
		if (error === 'Username already exists') {
			toast.error('Користувач з таким логіном вже існує');
		}
	}, [error, dispatch]);

	// гугл
	const googleLogin = useGoogleLogin({
		async onSuccess(tokenResponse) {
			usersBeforeRegister.current = users.length;
			const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: {
					Authorization: `Bearer ${tokenResponse.access_token}`,
				},
			});

			const response = await res.json();

			dispatch(
				register({
					username: response.given_name,
					password: response.sub,
				})
			);

			dispatch(
				logining({
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
						<span>Ви можете зареєструватися за допомогою акаунта Google</span>
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
						<span>Або зареєструватися за допомогою ел. пошти та паролю</span>

						<div className='email-login-email'>
							<span>Електронна пошта:</span>
							<input
								type='email'
								placeholder='your@email.com'
								value={regName}
								onChange={e => setRegName(e.target.value)}
								className='register-input-email'
							/>
							<p className='register-input-error'>це обов’язкове поле</p>
						</div>

						<div className='email-login-password'>
							<span>Пароль:</span>
							<input
								type='password'
								placeholder='••••••••'
								value={regPass}
								onChange={e => setRegPass(e.target.value)}
								className='register-input-pass'
							/>
							<p className='register-input-pass-error'>
								довжина паролю &gt;&#61; 8 символів
							</p>
						</div>
					</div>

					<div className='form-submit-container'>
						<button className='register-register-btn' type='submit'>
							реєстрація
						</button>
						<button
							type='button'
							className='register-login-btn'
							onClick={() => {
								navigate('/login');
							}}
						>
							Увійти
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
