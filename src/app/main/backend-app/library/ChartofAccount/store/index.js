import { combineReducers } from '@reduxjs/toolkit';
import accounts from './chartOfAccountSlice';

const reducer = combineReducers({
	accounts
});

export default reducer;
