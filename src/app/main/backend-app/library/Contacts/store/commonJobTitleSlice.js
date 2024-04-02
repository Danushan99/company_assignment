/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get common job titles */
export const getCommonJobTitles = createAsyncThunk(
	'commonApp/commonJobTitles/getCommonJobTitles',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.commonJobTitleUrl}`, {
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

const commonJobTitlesAdapter = createEntityAdapter({
	selectId: jobTitle => jobTitle.JobTitleID
});
export const { selectAll: selectAllJobTitle, selectById: selectJobTitleId } = commonJobTitlesAdapter.getSelectors(
	state => state.commonApp.commonJobTitles
);

const commonJobTitleSlice = createSlice({
	name: 'commonApp/commonJobTitles',
	initialState: commonJobTitlesAdapter.getInitialState({
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
		[getCommonJobTitles.fulfilled]: commonJobTitlesAdapter.setAll
	}
});

export const { setSearchText } = commonJobTitleSlice.actions;

export default commonJobTitleSlice.reducer;
