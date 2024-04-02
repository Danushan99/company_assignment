/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get services componet by service provide is */
export const getServiceComponets = createAsyncThunk(
	'MDLApp/serviceComponets/getServiceComponets',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.serviceComponetUrl}/${id}`, {
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

const serviceComponetsAdapter = createEntityAdapter({
	selectId: sProvider => sProvider.AccountID
});
export const { selectAll: selectAllServicesComponets, selectById: selectServiceComponetId } =
	serviceComponetsAdapter.getSelectors(state => state.MDLApp.serviceComponets);

const servicesComponentsSlice = createSlice({
	name: 'MDLApp/serviceComponets',
	initialState: serviceComponetsAdapter.getInitialState({
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
		[getServiceComponets.fulfilled]: serviceComponetsAdapter.setAll
	}
});

export const { setSearchText } = servicesComponentsSlice.actions;

export default servicesComponentsSlice.reducer;
