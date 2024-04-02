/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all mT office */
export const getMtOffices = createAsyncThunk(
	'commonApp/mtOffices/getMtOffices',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.mtOfficeUrl}`, {
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

const mtOfficeAdapter = createEntityAdapter({
	selectId: mtOffice => mtOffice.CompanyID
});
export const { selectAll: selectMtOffices, selectById: selectMtOfficeId } = mtOfficeAdapter.getSelectors(
	state => state.commonApp.mtOffices
);

const mtOfficeSlice = createSlice({
	name: 'commonApp/mtOffices',
	initialState: mtOfficeAdapter.getInitialState({
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
		[getMtOffices.fulfilled]: mtOfficeAdapter.setAll
	}
});

export const { setSearchText } = mtOfficeSlice.actions;

export default mtOfficeSlice.reducer;
