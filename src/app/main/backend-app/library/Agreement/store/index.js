import { combineReducers } from '@reduxjs/toolkit';
import agreements from './agrementSlice';

const reducer = combineReducers({
	agreements
});

export default reducer;
