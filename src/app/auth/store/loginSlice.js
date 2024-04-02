import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/jwtService';
import { getLanguagesList } from 'app/main/backend-app/administrator/system/language/store/languageSlice';
import { setUserData } from './userSlice';

export const submitLogin =
	({ UserName, pw }) =>
	async dispatch => {
		return jwtService
			.userLogin(UserName, pw)
			.then(data => {
				dispatch(setUserData(data));
				
				return dispatch(loginSuccess());
			})
			.catch(errors => {
				return dispatch(loginError(errors));
			});
	};

export const submitLoginAction = userData => async dispatch => {
	return jwtService
		.userLogin(userData)
		.then(data => {
			dispatch(setUserData(data));
			
			dispatch(getLanguagesList());
			return dispatch(loginSuccess());
		})
		.catch(error => {
			if (error?.response?.status === 400) {
				true;
				('error');
				('Unauthorized!');
			} else {
				true;
				('error');
				('Server error!');
			}
			//   return dispatch(loginError(error));
		});
};



const initialState = {
	success: false,
	errors: []
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		loginError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
