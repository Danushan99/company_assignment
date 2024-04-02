import { combineReducers } from "@reduxjs/toolkit";
import dashboardWidgetsSlice from "./dashboardWidgetsSlice";

const reducer = combineReducers({
  dashboardWidgetsSlice,
});

export default reducer;
