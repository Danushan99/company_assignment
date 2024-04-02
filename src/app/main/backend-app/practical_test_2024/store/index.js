import { combineReducers } from '@reduxjs/toolkit';

import juornalEntries from './JuornalEntrySlice';
const reducer = combineReducers({
	juornalEntries
});

export default reducer;