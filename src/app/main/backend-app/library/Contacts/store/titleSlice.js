/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all titles */
export const getAllTitles = createAsyncThunk('commonApp/titles/getAllTitles', async (_,{rejectWithValue}) => {
	try {
		const response = await axios.get(`${apiUrl}/${commonUrl.commonTitleUrl}`, {
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

const titleAdapter = createEntityAdapter({
	selectId: key => key.titles
});
export const { selectAll: selectAllTitles, selectById: selectTitleId } = titleAdapter.getSelectors(
	state => state.commonApp.titles
);

const titleSlice = createSlice({
	name: 'commonApp/titles',
	initialState: titleAdapter.getInitialState({
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
		[getAllTitles.fulfilled]: titleAdapter.setAll
	}
});

export const { setSearchText } = titleSlice.actions;

export default titleSlice.reducer;
