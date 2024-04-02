/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all free types */
export const getFreeTypes = createAsyncThunk('MDLApp/freeTypes/getFreeTypes', async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.freeTypeUrl}`, {
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

const freeTypeAdapter = createEntityAdapter({
	selectId: freeType => freeType.TimeID
});
export const { selectAll: selectFreeTypes, selectById: selectFreeTypeId } = freeTypeAdapter.getSelectors(
	state => state.MDLApp.freeTypes
);

const freeTypesSlice = createSlice({
	name: 'MDLApp/freeTypes',
	initialState: freeTypeAdapter.getInitialState({
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
		[getFreeTypes.fulfilled]: freeTypeAdapter.setAll
	}
});

export const { setSearchText } = freeTypesSlice.actions;

export default freeTypesSlice.reducer;
