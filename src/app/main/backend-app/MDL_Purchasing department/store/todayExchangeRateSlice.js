/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get today exchange rate */
export const getTodayExchangeRate = createAsyncThunk(
	'MDLApp/todayExRate/getTodayExchangeRate',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.todayExchangeRateUrl}`, {
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

const todayRateAdapter = createEntityAdapter({
	selectId: exchange => exchange.Date
});
export const { selectAll: selectAllTodayRates, selectById: selectTodayRateId } = todayRateAdapter.getSelectors(
	state => state.MDLApp.todayExRate
);

const todayExchangeRateSlice = createSlice({
	name: 'MDLApp/todayExRate',
	initialState: todayRateAdapter.getInitialState({
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
		[getTodayExchangeRate.fulfilled]: todayRateAdapter.setAll
	}
});

export const { setSearchText } = todayExchangeRateSlice.actions;

export default todayExchangeRateSlice.reducer;
