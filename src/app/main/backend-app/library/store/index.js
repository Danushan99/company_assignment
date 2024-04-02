import { combineReducers } from '@reduxjs/toolkit';
import hsCodes from './hsCodesSlice';

const reducer = combineReducers({
  hsCodes,
});

export default reducer;
