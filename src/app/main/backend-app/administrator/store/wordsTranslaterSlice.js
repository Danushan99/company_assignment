/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';

const apiUrl = process.env.REACT_APP_API_URL;

export const getwordsList = createAsyncThunk('wordsTranslaterApp/allWords/getwordsList', async (searchUrl,{rejectWithValue}) => {
	try {
		if (searchUrl) {
			const response = await axios.get(`${apiUrl}/${commonUrl.commonDictionaryUrl}/${searchUrl}`);
			if (response.status === 200) {
				const resultData = await response.data?.datas;
				const data = resultData || [];
				return { data };
			}
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const wordsTranslaterAdapter = createEntityAdapter({
	selectId: wordsTranslater => wordsTranslater.LetterID
});

export const { selectAll: selectWords, selectById: selectWordsById } = wordsTranslaterAdapter.getSelectors(
	state => state.wordsTranslaterApp.allWords
);

const wordsTranslaterSlice = createSlice({
	name: 'wordsTranslaterApp/allWords',
	initialState: wordsTranslaterAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		allList: [],
		routeParams: {}
	}),
	reducers: {
		setWordsTranSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		changeOrder: (state, action) => {
			state.orderBy = action.payload;
		}
	},
	extraReducers: {
		[getwordsList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			wordsTranslaterAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.allList = data;
		}
	}
});

export const { setWordsTranSearchText, changeOrder } = wordsTranslaterSlice.actions;

export default wordsTranslaterSlice.reducer;
