/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all interCom */
export const getAllInterComs = createAsyncThunk(
	'commonApp/interComs/getAllInterComs',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.incotermUrl}`, {
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

const interComAdapter = createEntityAdapter({
	selectId: interCom => interCom.IncoTermID
});
export const { selectAll: selectInterComs, selectById: selectInterComId } = interComAdapter.getSelectors(
	state => state.commonApp.interComs
);

const interComSlice = createSlice({
	name: 'commonApp/interComs',
	initialState: interComAdapter.getInitialState({
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
		[getAllInterComs.fulfilled]: interComAdapter.setAll
	}
});

export const { setSearchText } = interComSlice.actions;

export default interComSlice.reducer;
