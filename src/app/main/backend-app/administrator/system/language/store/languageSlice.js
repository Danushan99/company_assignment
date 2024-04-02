/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getLanguagesList = createAsyncThunk(
	'languageTranslatorApp/languages/getLanguagesList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${userSectionUrl.languageUrl}/all`);
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

export const addLanguage = createAsyncThunk(
	'languageTranslatorApp/languages/addLanguage',
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${userSectionUrl.languageUrl}`, formData);
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getLanguagesList());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateLanguage = createAsyncThunk(
	'languageTranslatorApp/languages/updateLanguage',
	async (updateData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${userSectionUrl.languageUrl}/${updateData?.LetterID}`,
				updateData
			);

			if (response.status === 200) {
				const data = await response.data;
				dispatch(getLanguagesList());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeLanguage = createAsyncThunk(
	'languageTranslatorApp/languages/removeLanguage',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${userSectionUrl.languageUrl}/${formSubmittedData?.ids}`;
			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getLanguagesList());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 4000
				});
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const languageAdapter = createEntityAdapter({
	selectId: language => language.LetterID
});

export const { selectAll: selectLanguages, selectById: selectLanguagesById } = languageAdapter.getSelectors(
	state => state.languageTranslatorApp.languages
);

const languageSlice = createSlice({
	name: 'languageTranslatorApp/languages',
	initialState: languageAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		list: [],
		orderDescending: false,
		routeParams: {},
		languageDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		}
	}),
	reducers: {
		setLanguageSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		toggleOrderDescending: (state, action) => {
			state.orderDescending = !state.orderDescending;
		},
		changeOrder: (state, action) => {
			state.orderBy = action.payload;
		},
		// open dialog when create new
		OpenNewLanguageDialog: (state, action) => {
			state.languageDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeNewLanguageDialog: (state, action) => {
			state.languageDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		openEditLanguageDialog: (state, action) => {
			state.languageDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload,
				selectedId: action.payload.parentID
			};
		},
		closeEditLanguageDialog: (state, action) => {
			state.languageDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		}
	},
	extraReducers: {
		[addLanguage.fulfilled]: languageAdapter.addOne,
		[updateLanguage.fulfilled]: languageAdapter.upsertOne,
		[getLanguagesList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			languageAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.list = data;
		}
	}
});

export const {
	setLanguageSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewLanguageDialog,
	closeNewLanguageDialog,
	openEditLanguageDialog,
	closeEditLanguageDialog
} = languageSlice.actions;

export default languageSlice.reducer;
