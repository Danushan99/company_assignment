/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { userSectionUrl, commonSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getLocation = createAsyncThunk('locationApp/location/getLocation', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${commonSectionUrl.allLocationsUrl}`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});
		if (response.status === 200) {
			const data = await response.data.datas;

			if (data) {
				return data;
			}
			return null;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const removeUsers = createAsyncThunk('locationApp/location/removeUsers', async (userIds, { dispatch, rejectWithValue }) => {
	try {
		const response = await axios.delete(
			`${apiUrl}/${userSectionUrl.usersUrl}/${userIds}`
			// {
			//   headers: { tokensapi: JwtService.getRefreshToken() },
			// }
		);
		if (response.status === 200) {
			const data = await response.data.datas;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});

		//	dispatch(getUsers());
			return data;
		}

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const locationAdapter = createEntityAdapter({
	selectId: location => location.LocationID
});

export const { selectAll: selectLocations, selectById: selectLocationById } = locationAdapter.getSelectors(
	state => state.locationApp.alllocations
);

const locationSlice = createSlice({
	name: 'locationApp/location',
	initialState: locationAdapter.getInitialState({
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
		[getLocation.fulfilled]: locationAdapter.setAll
	}
});

export const { setUsersSearchText } = locationSlice.actions;

export default locationSlice.reducer;
