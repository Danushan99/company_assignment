/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { commonUrl, userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';

const apiUrl = process.env.REACT_APP_API_URL;

export const getwordsListByUrl = createAsyncThunk('dictionaryApp/words/getwordsListByUrl', async (searchUrl, { rejectWithValue }) => {
	try {
		if (searchUrl) {
			const response = await axios.get(`${apiUrl}/${commonUrl.dictionaryUrl}/${searchUrl}`);
			if (response.status === 200) {
				const resultData = await response.data?.datas;
				const data = resultData || [];
				return { data };
			}
			JwtService.autoLogoutRedirection();
		}
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const getwordsListByNotCurrentUrl = createAsyncThunk(
	'dictionaryApp/words/getwordsListByNotCurrentUrl',
	async (searchUrl, { rejectWithValue }) => {
		try {
			if (searchUrl) {
				const response = await axios.get(`${apiUrl}/${commonUrl.dictionaryUrl}/${searchUrl}`);
				if (response.status === 200) {
					const resultData = await response.data?.datas;
					const data = resultData || [];
					return { data };
				}
				JwtService.autoLogoutRedirection();
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
/**
 * HSCode URL
 */
export const getwordsListByHSCodeUrl = createAsyncThunk(
	'dictionaryApp/words/getwordsListByHSCodeUrl',
	async (searchUrl, { rejectWithValue }) => {
		try {
			if (searchUrl) {
				const response = await axios.get(`${apiUrl}/${commonUrl.dictionaryUrl}/${searchUrl}`);
				if (response.status === 200) {
					const resultData = await response.data?.datas;
					const data = resultData || [];
					return { data };
				}
				JwtService.autoLogoutRedirection();
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getwordsListByContactUrl = createAsyncThunk(
	'dictionaryApp/words/getwordsListByContactUrl',
	async (searchUrl, { rejectWithValue }) => {
		try {
			if (searchUrl) {
				const response = await axios.get(`${apiUrl}/${commonUrl.dictionaryUrl}/${searchUrl}`);
				if (response.status === 200) {
					const resultData = await response.data?.datas;
					const data = resultData || [];
					return { data };
				}
				JwtService.autoLogoutRedirection();
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const getwordsListByTariffUrl = createAsyncThunk(
	'dictionaryApp/words/getwordsListByTariffUrl',
	async (searchUrl, { rejectWithValue }) => {
		try {
			if (searchUrl) {
				const response = await axios.get(`${apiUrl}/${commonUrl.dictionaryUrl}/${searchUrl}`);
				if (response.status === 200) {
					const resultData = await response.data?.datas;
					const data = resultData || [];
					return { data };
				}
				JwtService.autoLogoutRedirection();
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getwordsListByLocationUrl = createAsyncThunk(
	'dictionaryApp/words/getwordsListByLocationUrl',
	async (searchUrl, { rejectWithValue }) => {
		try {
			if (searchUrl) {
				const response = await axios.get(`${apiUrl}/${commonUrl.dictionaryUrl}/${searchUrl}`);
				if (response.status === 200) {
					const resultData = await response.data?.datas;
					const data = resultData || [];
					return { data };
				}
				JwtService.autoLogoutRedirection();
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getwordsList = createAsyncThunk('dictionaryApp/words/getwordsList', async (searchUrl, { rejectWithValue })  => {
	try {
		if (searchUrl) {
			const response = await axios.get(`${apiUrl}/${userSectionUrl.languageUrl}/all`);
			const resultData = await response.data?.datas;
			const data = resultData || [];
			return { data };
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const dictionaryAdapter = createEntityAdapter({
	selectId: dictionary => dictionary.LetterID
});

export const { selectAll: selectWords, selectById: selectWordsById } = dictionaryAdapter.getSelectors(
	state => state.dictionaryApp.words
);

const dictionarySlice = createSlice({
	name: 'dictionaryApp/words',
	initialState: dictionaryAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		list: [],
		allList: [],
		preList: [],
		hsCodeWordsList: [],
		contactwordsList: [],
		tariffWordsList: [],
		locationsWordsList: [],
		routeParams: {}
	}),
	reducers: {
		setWordsSearchText: {
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
		[getwordsListByUrl.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			dictionaryAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.list = data;
		},

		[getwordsList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			dictionaryAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.allList = data;
		},

		[getwordsListByNotCurrentUrl.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			dictionaryAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.preList = data;
		},

		[getwordsListByTariffUrl.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			dictionaryAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.tariffWordsList = data;
		},

		[getwordsListByLocationUrl.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			dictionaryAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.locationsWordsList = data;
		},

		[getwordsListByContactUrl.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			dictionaryAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.contactwordsList = data;
		},

		[getwordsListByHSCodeUrl.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			dictionaryAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.hsCodeWordsList = data;
		}
	}
});

export const { setWordsSearchText, changeOrder } = dictionarySlice.actions;

export default dictionarySlice.reducer;
