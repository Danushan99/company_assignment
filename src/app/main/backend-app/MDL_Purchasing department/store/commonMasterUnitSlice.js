/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all master unit */
export const getMasterUnits = createAsyncThunk(
	'commonApp/masterUnits/getMasterUnits',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.masterunitUrl}`, {
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

const masterUnitAdapter = createEntityAdapter({
	selectId: unit => unit.UnitID
});

const commonMasterUnitSlice = createSlice({
	name: 'commonApp/commonMasterUnits',
	initialState: masterUnitAdapter.getInitialState({
		searchText: '',
		rows: []
	}),
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: builder => {
		builder.addCase(getMasterUnits.fulfilled, (state, action) => {
			state.rows = action.payload.data || [];
		});
	}
});

export const { setSearchText } = commonMasterUnitSlice.actions;

export default commonMasterUnitSlice.reducer;
