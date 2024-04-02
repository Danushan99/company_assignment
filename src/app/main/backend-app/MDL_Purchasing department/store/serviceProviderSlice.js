/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get service provider */
export const getServiceProviders = createAsyncThunk(
	'MDLApp/serviceProviders/getServiceProvider',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.mdlServiceProviderUrl}`, {
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

const serviceProviderAdapter = createEntityAdapter({
	selectId: sProvider => sProvider.ContactID
});
export const { selectAll: selectAllServiceProviders, selectById: selectServiceProviderId } =
	serviceProviderAdapter.getSelectors(state => state.MDLApp.serviceProviders);

const serviceProviderSlice = createSlice({
	name: 'MDLApp/serviceProviders',
	initialState: serviceProviderAdapter.getInitialState({
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
		[getServiceProviders.fulfilled]: serviceProviderAdapter.setAll
	}
});

export const { setSearchText } = serviceProviderSlice.actions;

export default serviceProviderSlice.reducer;
