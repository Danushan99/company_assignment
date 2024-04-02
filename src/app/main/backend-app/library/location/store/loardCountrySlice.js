/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getCountrylist = createAsyncThunk('todoApp/countrys/getcountries', async (_, { rejectWithValue })  => {
	try {
		const response = await axios.get(`${apiUrl}/glos/country`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});
		if (response.status === 200) {
			const data = await response.data.datas;
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const countrylistAdapter = createEntityAdapter({
	selectId: country => country.CountryID
});

export const { selectAll: selectCountries, selectById: selectUserById } = countrylistAdapter.getSelectors(
	state => state.todoApp.countrys
);

const loardCountrySlice = createSlice({
	name: 'todoApp/countrys',
	initialState: countrylistAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setUsersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCountrylist.fulfilled]: countrylistAdapter.setAll
	}
});

export const { setUsersSearchText } = loardCountrySlice.actions;

export default loardCountrySlice.reducer;
