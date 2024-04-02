/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get common contact types */
export const getCommonContactTypes = createAsyncThunk(
	'commonApp/commonContactTypes/getCommonContactTypes',
	async (_, {rejectWithValue}) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.commonContactTypeUrl}`, {
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

const commonContactTypesAdapter = createEntityAdapter({
	selectId: ComContactType => ComContactType.ContactTypeID
});
export const { selectAll: selectAllTitles, selectById: selectTitleId } = commonContactTypesAdapter.getSelectors(
	state => state.commonApp.commonContactTypes
);

const commonContactTypeSlice = createSlice({
	name: 'commonApp/commonContactTypes',
	initialState: commonContactTypesAdapter.getInitialState({
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
		[getCommonContactTypes.fulfilled]: commonContactTypesAdapter.setAll
	}
});

export const { setSearchText } = commonContactTypeSlice.actions;

export default commonContactTypeSlice.reducer;
