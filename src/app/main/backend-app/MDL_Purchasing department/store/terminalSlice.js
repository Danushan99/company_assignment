/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all terminals */
export const getAllTerminals = createAsyncThunk(
	'commonApp/terminals/getAllTerminals',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.terminalUrl}`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const resultData = await response.data?.datas;
				const data = resultData || [];

				return { data };
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const terminalAdapter = createEntityAdapter({
	selectId: terminal => terminal.TerminalID
});
export const { selectAll: selectTerminals, selectById: selectTerminalId } = terminalAdapter.getSelectors(
	state => state.commonApp.terminals
);

const terminalSlice = createSlice({
	name: 'commonApp/terminals',
	initialState: terminalAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getAllTerminals.fulfilled]: terminalAdapter.setAll
	}
});

export const { setSearchText } = terminalSlice.actions;

export default terminalSlice.reducer;
