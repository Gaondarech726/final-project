import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { App } from './App';
import './index.scss';

import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID =
	'611865443622-qvp64okcmqjie9dretb1ko20c8ub9uf7.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<HashRouter>
			<GoogleOAuthProvider clientId={CLIENT_ID}>
				<App />
			</GoogleOAuthProvider>
		</HashRouter>
	</React.StrictMode>
);
