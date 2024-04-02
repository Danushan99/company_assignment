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
export const { selectAll: selectMasterUnits, selectById: selectMasterUnitId } = masterUnitAdapter.getSelectors(
	state => state.commonApp.masterUnits
);

const masterUnitSlice = createSlice({
	name: 'commonApp/masterUnits',
	initialState: masterUnitAdapter.getInitialState({
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
		[getMasterUnits.fulfilled]: masterUnitAdapter.setAll
	}
});

export const { setSearchText } = masterUnitSlice.actions;

export default masterUnitSlice.reducer;
