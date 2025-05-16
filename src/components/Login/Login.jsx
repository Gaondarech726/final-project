import './Login.scss';
import logo from '../../img/logo.svg';
import googleLogo from '../../img/google-logo.svg';

const Login = () => {
	return (
		<div className='login-container'>
			<div className='login-title-container'>
				<h1>InvestIQ</h1>
				<h3>Smart Finance</h3>
			</div>
			<div className='login-form-container'>
				<form className='login-form'>
					<div className='google-login'>
						<span>Ви можете авторизуватися за допомогою акаунта Google</span>
						<button>
							<img src={googleLogo} alt='googleLogo' />
							<span>Google</span>
						</button>
					</div>

					<div className='email-login'>
						<span>
							Або увійти за допомогою ел. пошти та праолю після реєстрації
						</span>

						<div className='email-login-email'>
							<span>Електронна пошта:</span>
							<input type='email' placeholder='your@email.com' />
						</div>
						<div className='email-login-password'>
							<span>Пароль:</span>
							<input type='password' placeholder='••••••••' />
						</div>
					</div>

					<div className='form-submit-container'>
						<button className='login-btn'>Увійти</button>
						<button className='register-btn'>реєстрація</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
