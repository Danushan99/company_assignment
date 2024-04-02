/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get validity types */
export const getValidityTypes = createAsyncThunk(
	'MDLApp/validityTypes/getValidityTypes',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.tariffValidityTypeUrl}`, {
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

const validityTypeAdapter = createEntityAdapter({
	selectId: validity => validity.TypeID
});
export const { selectAll: selectAllValidityTypes, selectById: selectValidityTypeId } = validityTypeAdapter.getSelectors(
	state => state.MDLApp.validityTypes
);

const tariffValidityTypeSlice = createSlice({
	name: 'MDLApp/validityTypes',
	initialState: validityTypeAdapter.getInitialState({
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
		[getValidityTypes.fulfilled]: validityTypeAdapter.setAll
	}
});

export const { setSearchText } = tariffValidityTypeSlice.actions;

export default tariffValidityTypeSlice.reducer;
