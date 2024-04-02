/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';

const apiUrl = process.env.REACT_APP_API_URL;

export const getJoblist = createAsyncThunk('system/systemJob/getCommon', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${userSectionUrl.jobTitle}`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});
		if (response.status === 200) {
			const data = await response.data.datas;
			return data;
		}

		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// type User = { UserID: number};
const jobtitlesAdapter = createEntityAdapter({
	selectId: job => job.JobTitleID
});

export const { selectAll: selectJobtitles, selectById: selectUserById } = jobtitlesAdapter.getSelectors(
	state => state.system.systemJob
);

const systemJobtitleSlice = createSlice({
	name: 'system/systemJob',
	initialState: jobtitlesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setUsersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getJoblist.fulfilled]: jobtitlesAdapter.setAll
	}
});

export const { setUsersSearchText } = systemJobtitleSlice.actions;

export default systemJobtitleSlice.reducer;
