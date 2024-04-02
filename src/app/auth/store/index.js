import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import user from './userSlice';
import logUser from './logedUserSlice';
import loadMenu from './loardMenuSlice';

const authReducers = combineReducers({
	user,
	login,
	logUser,
	loadMenu
});

export default authReducers;
