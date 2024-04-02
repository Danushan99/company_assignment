/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get services */
export const getServices = createAsyncThunk('MDLApp/services/getServices', async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${commonSectionUrl.servicesUrl}`, {
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

const serviceAdapter = createEntityAdapter({
	selectId: sProvider => sProvider.AccountID
});
export const { selectAll: selectAllServices, selectById: selectServiceId } = serviceAdapter.getSelectors(
	state => state.MDLApp.services
);

const serviceSlice = createSlice({
	name: 'MDLApp/services',
	initialState: serviceAdapter.getInitialState({
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
		[getServices.fulfilled]: serviceAdapter.setAll
	}
});

export const { setSearchText } = serviceSlice.actions;

export default serviceSlice.reducer;
