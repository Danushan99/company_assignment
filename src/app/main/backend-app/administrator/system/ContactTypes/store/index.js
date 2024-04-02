import { combineReducers } from '@reduxjs/toolkit';
import contactTypes from './ContactTypesSlice';

const reducer = combineReducers({
	contactTypes
});

export default reducer;
