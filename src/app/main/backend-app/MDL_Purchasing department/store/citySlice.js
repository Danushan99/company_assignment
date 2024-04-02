/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all city */
export const getAllCities = createAsyncThunk('commonApp/cities/getAllCities', async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${commonUrl.cityUrl}`, {
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
});

const cityAdapter = createEntityAdapter({
	selectId: city => city.CityID
});
export const { selectAll: selectCities, selectById: selectCityId } = cityAdapter.getSelectors(
	state => state.commonApp.cities
);

const citySlice = createSlice({
	name: 'commonApp/cities',
	initialState: cityAdapter.getInitialState({
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
		[getAllCities.fulfilled]: cityAdapter.setAll
	}
});

export const { setSearchText } = citySlice.actions;

export default citySlice.reducer;
