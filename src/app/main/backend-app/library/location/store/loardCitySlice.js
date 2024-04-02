/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getCitylist = createAsyncThunk('todoApp/cities/getcities', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/glos/city`, {
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

const citieslistAdapter = createEntityAdapter({
	selectId: cities => cities.CityID
});

export const { selectAll: selectCities, selectById: selectUserById } = citieslistAdapter.getSelectors(
	state => state.todoApp.cities
);

const loardCitySlice = createSlice({
	name: 'todoApp/cities',
	initialState: citieslistAdapter.getInitialState({
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
		[getCitylist.fulfilled]: citieslistAdapter.setAll
	}
});

export const { setUsersSearchText } = loardCitySlice.actions;

export default loardCitySlice.reducer;
