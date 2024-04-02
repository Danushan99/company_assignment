/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getCurrencyTypeList = createAsyncThunk(
	'currencyTypeApp/currencies/getCurrencyTypeList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${userSectionUrl.currencyTypeUrl}`);
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

export const addCurrencyType = createAsyncThunk(
	'currencyTypeApp/currencies/addCurrencyType',
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${userSectionUrl.currencyTypeUrl}`, formData);

			if (response.status === 200) {
				const data = await response.data;
				dispatch(getCurrencyTypeList());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				return data;
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateCurrencyType = createAsyncThunk(
	'currencyTypeApp/currencies/updateCurrencyType',
	async (formdata, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(`${apiUrl}/${userSectionUrl.currencyTypeUrl}/${formdata?.key}`, formdata);
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getCurrencyTypeList());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				return data;
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeCurrencyType = createAsyncThunk(
	'currencyTypeApp/currencies/removeCurrencyType',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${userSectionUrl.currencyTypeUrl}/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getCurrencyTypeList());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				return data;
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const currencyTypeAdapter = createEntityAdapter({
	selectId: currency => currency.key
});

export const { selectAll: selectCurrencyTypes, selectById: selectCurrencyTypeById } = currencyTypeAdapter.getSelectors(
	state => state.currencyTypeApp.currencies
);

const currencyTypeSlice = createSlice({
	name: 'currencyTypeApp/currencies',
	initialState: currencyTypeAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		currencyTypeDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		}
	}),
	reducers: {
		setSearchText: {
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
		OpenNewCurrencyTypeDialog: (state, action) => {
			state.currencyTypeDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeNewCurrencyTypeDialog: (state, action) => {
			state.currencyTypeDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		openEditCurrencyTypeDialog: (state, action) => {
			state.currencyTypeDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload,
				selectedId: action.payload.ParentID
			};
		},
		closeEditCurrencyTypeDialog: (state, action) => {
			state.currencyTypeDialog = {
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
		[addCurrencyType.fulfilled]: currencyTypeAdapter.addOne,
		[updateCurrencyType.fulfilled]: currencyTypeAdapter.upsertOne,
		[getCurrencyTypeList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			currencyTypeAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewCurrencyTypeDialog,
	closeNewCurrencyTypeDialog,
	openEditCurrencyTypeDialog,
	closeEditCurrencyTypeDialog
} = currencyTypeSlice.actions;

export default currencyTypeSlice.reducer;
