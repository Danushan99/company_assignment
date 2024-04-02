import { combineReducers } from '@reduxjs/toolkit';

import todos from './todosSlice';
import countrys from './loardCountrySlice';
import cities from './loardCitySlice';
import ports from './loardPortSlice';
import terminal from './loardTerminalSlice';

const reducer = combineReducers({
	cities,
	countrys,
	ports,
	terminal,
	todos
});

export default reducer;
