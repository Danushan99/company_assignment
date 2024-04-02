import { combineReducers } from '@reduxjs/toolkit';
import systemUsers from './systemUsersSlice';
import systemJob from './systemJobtitleSlice';
import systemCompany from './systemCompanySlice';
import systemUser from './systemUserSlice';
import words from './dictionarySlice';

const reducer = combineReducers({
	systemUsers,
	systemJob,
	systemCompany,
	systemUser,
	words
});

export default reducer;
