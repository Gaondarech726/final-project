import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const usersArray = JSON.parse(localStorage.getItem('users'));
const userFromStorage = JSON.parse(localStorage.getItem('currentUser'));
const lastRegisterStorage = JSON.parse(localStorage.getItem('lastRegister'));

const initialState = {
	users: usersArray || [],
	currentUser: userFromStorage || null,
	error: null,
	lastRegister: lastRegisterStorage || null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		register(state, action) {
			const existing = state.users.find(
				user => user.username === action.payload.username
			);

			if (existing) {
				state.error = 'Username already exists';
			} else if (
				action.payload.password.length < 8 ||
				action.payload.username.length < 1
			) {
				state.error = 'Inputs are empty';
			} else {
				state.users.push(action.payload);
				state.error = null;
				localStorage.setItem('users', JSON.stringify(state.users));

				state.lastRegister = {
					username: action.payload.username,
					password: action.payload.password,
				};
				localStorage.setItem(
					'lastRegister',
					JSON.stringify(state.lastRegister)
				);

				toast.success('Успішна реєстрація');
			}
		},

		logining(state, action) {
			const user = state.users.find(
				user =>
					user.username === action.payload.username &&
					user.password === action.payload.password
			);

			if (user) {
				state.currentUser = user;
				toast.success('Вхід виконано успішно');
				localStorage.setItem('currentUser', JSON.stringify(user));
				state.error = null;
			} else {
				state.error = 'Invalid data';
			}
		},

		googleAuth(state, action) {
			const existing = state.users.find(
				user => user.username === action.payload.username
			);

			state.lastRegister = null;
			localStorage.setItem('lastRegister', JSON.stringify(state.lastRegister));

			if (existing) {
				const user = state.users.find(
					user =>
						user.username === action.payload.username &&
						user.password === action.payload.password
				);

				state.currentUser = user;
				state.error = null;

				toast.success('Вхід виконано успішно');

				localStorage.setItem('currentUser', JSON.stringify(user));
			} else {
				state.users.push(action.payload);

				const user = state.users.find(
					user =>
						user.username === action.payload.username &&
						user.password === action.payload.password
				);

				state.currentUser = user;
				state.error = null;

				toast.success('Вхід виконано успішно');

				localStorage.setItem('users', JSON.stringify(state.users));
				localStorage.setItem('currentUser', JSON.stringify(user));
			}
		},

		logout(state) {
			state.currentUser = null;
			localStorage.removeItem('currentUser');
		},

		// ✅ ДОДАНО updateBalance
		updateBalance(state, action) {
			if (state.currentUser) {
				state.currentUser = {
					...state.currentUser,
					balance: action.payload,
				};
				localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
			}
		},

		clearError(state) {
			state.error = null;
		},
	},
});

export const {
	register,
	logining,
	googleAuth,
	logout,
	updateBalance,
	clearError,
} = authSlice.actions;
export default authSlice.reducer;
