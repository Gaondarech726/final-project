import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [],
	currentUser: null,
	error: null,
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
				console.log('Username already exists');
			} else {
				state.users.push(action.payload);
				state.error = null;

				console.log('user created');
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
				state.error = null;

				console.log('user logined');
			} else {
				state.error = 'Invalid data';
				console.log('Invalid data');
			}
		},

		logout(state) {
			state.currentUser = null;
			console.log('user deleted');
		},
	},
});

export const { register, logining, logout } = authSlice.actions;
export default authSlice.reducer;
