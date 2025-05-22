import './Login.scss';
import logo from '../../img/logo.svg';
import googleLogo from '../../img/google-logo.svg';
import loginBackground from '../../img/login-background.svg';
import loginBackgroundSecond from '../../img/login-background-second.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logining } from '../../redux/authSlice';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const currentUser = useSelector(state => state.auth.currentUser);
	const [logName, setLogName] = useState('');
	const [logPass, setLogPass] = useState('');

	// якщо юзер залогінений, то перекидає на головну сторінку
	useEffect(() => {
		if (currentUser) {
			navigate('/');
		}
	}, [currentUser, navigate]);

	// відправка форми, додавання юзера
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(logining({ username: logName, password: logPass }));
	};

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
						<button>
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
