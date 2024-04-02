import { combineReducers } from '@reduxjs/toolkit';
import rates from './exchangeRateSlice';

const reducer = combineReducers({
	rates
});

export default reducer;
