import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import words from 'app/main/backend-app/administrator/store/dictionarySlice';
import allWords from 'app/main/backend-app/administrator/store/wordsTranslaterSlice';
import MDLApp from 'app/main/backend-app/MDL_Purchasing department/store/index';
import fuse from './fuse';
import i18n from './i18nSlice';
import quotationOptions from './optionSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		words,
		fuse,
		i18n,
		allWords,
		MDLApp,
		quotationOptions,
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		// state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
