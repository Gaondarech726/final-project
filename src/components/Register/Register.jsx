import './Register.scss';
import logo from '../../img/logo.svg';
import googleLogo from '../../img/google-logo.svg';
import loginBackground from '../../img/login-background.svg';
import loginBackgroundSecond from '../../img/login-background-second.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [regName, setRegName] = useState('');
	const [regPass, setRegPass] = useState('');
	let users = useSelector(state => state.auth.users);
	let error = useSelector(state => state.auth.error);

	let usersBeforeRegister = useRef(null);

	// відправка форми, додавання юзера
	const handleSubmit = e => {
		e.preventDefault();
		usersBeforeRegister.current = users.length;

		dispatch(register({ username: regName, password: regPass }));

		if (regName.length < 1) {
			document.querySelector('.register-input-error').style.display = 'block';
		}
		if (regPass.length < 8) {
			document.querySelector('.register-input-pass-error').style.display =
				'block';
		}
	};

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
						<button type='button'>
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
