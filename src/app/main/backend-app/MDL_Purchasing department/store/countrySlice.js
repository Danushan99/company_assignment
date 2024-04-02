/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all countries */
export const getAllCountries = createAsyncThunk(
	'commonApp/countries/getAllCountries',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.countryUrl}`, {
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

const countryAdapter = createEntityAdapter({
	selectId: country => country.CountryID
});
export const { selectAll: selectAllCountries, selectById: selectCountryId } = countryAdapter.getSelectors(
	state => state.commonApp.countries
);

const countrySlice = createSlice({
	name: 'commonApp/countries',
	initialState: countryAdapter.getInitialState({
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
		[getAllCountries.fulfilled]: countryAdapter.setAll
	}
});

export const { setSearchText } = countrySlice.actions;

export default countrySlice.reducer;
