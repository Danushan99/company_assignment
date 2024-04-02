/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all juornal entry*/
export const getJuornalEntry = createAsyncThunk(
	'financeApp/juornalEntries/getCargoTypes',
	async (params, { rejectWithValue }) => {
		try {
			// const response = await axios.get(`${apiUrl}/${commonUrl.CargoTypeUrl}`, {
			// 	headers: { tokensapi: JwtService.getRefreshToken() }
			// });
			// if (response.status === 200) {
			// 	const resultData = await response.data?.datas;
			// 	const data = resultData || [];

			// 	return { data };
			// }
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// const JuornalEntryAdapter = createEntityAdapter({
// 	selectId: unit => unit.cargoId // pls change it
// });
// export const { selectAll: selectjuornalEntries, selectById: selectjuornalEntriyId } = JuornalEntryAdapter.getSelectors(
// 	state => state.financeApp.juornalEntries
// );

const JuornalEntrySlice = createSlice({
	name: 'financeApp/juornalEntries',
	// initialState: JuornalEntryAdapter.getInitialState({
	// 	searchText: ''
	// }),
	reducers: {
		// setSearchText: {
		// 	reducer: (state, action) => {
		// 		state.searchText = action.payload;
		// 	},
		// 	prepare: event => ({ payload: event.target.value || '' })
		// }
	},
	extraReducers: {
		// [getJuornalEntry.fulfilled]: JuornalEntryAdapter.setAll
	}
});

// export const { setSearchText } = JuornalEntrySlice.actions;

export default JuornalEntrySlice.reducer;
