import { combineReducers } from '@reduxjs/toolkit';
import languages from './languageSlice';

const reducer = combineReducers({
	languages
});

export default reducer;
