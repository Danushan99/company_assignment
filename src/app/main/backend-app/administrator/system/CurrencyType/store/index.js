import { combineReducers } from '@reduxjs/toolkit';
import currencies from './currencyTypeSlice';

const reducer = combineReducers({
	currencies
});

export default reducer;
