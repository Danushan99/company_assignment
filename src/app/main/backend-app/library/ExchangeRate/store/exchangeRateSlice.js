/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getExchangeRateList = createAsyncThunk(
	'exchangeRateApp/rates/getExchangeRateList',
	async (routeParams, { getState, rejectWithValue }) => {
		try {
			routeParams = routeParams || getState().exchangeRateApp.rates.routeParams;
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.exchangeRateUrl}`, {
				params: routeParams
			});
			if (response.status === 200) {
				const resultData = await response.data?.datas?.rows;
				const data = resultData || [];

				return { data, routeParams };
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addExchangeRate = createAsyncThunk(
	'exchangeRateApp/rates/addExchangeRate',
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${librarySectionUrl.exchangeRateUrl}`, formData);

			const data = await response.data;
			dispatch(getExchangeRateList());
			toast.success(data?.Datas, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateExchangeRate = createAsyncThunk(
	'exchangeRateApp/rates/updateExchangeRate',
	async (formdata, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(`${apiUrl}/${librarySectionUrl.exchangeRateUrl}`, formdata);
			const data = await response.data;
			dispatch(getExchangeRateList());
			toast.success(data?.Datas, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeExchangeRate = createAsyncThunk(
	'exchangeRateApp/rates/removeExchangeRate',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.exchangeRateUrl}`;

			const response = await axios.delete(url, {
				data: { Date: formSubmittedData?.Date, reson: formSubmittedData?.reason }
			});
			const data = await response.data;
			dispatch(getExchangeRateList());
			toast.success(data?.Datas, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const exchangeRateAdapter = createEntityAdapter({
	selectId: rate => rate.exchangeRateID
});

export const { selectAll: selectExchangeRates, selectById: selectExchangeRateById } = exchangeRateAdapter.getSelectors(
	state => state.exchangeRateApp.rates
);

const exchangeRateSlice = createSlice({
	name: 'exchangeRateApp/rates',
	initialState: exchangeRateAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		exchangeRateDialog: {
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
		OpenNewExchangeRateDialog: (state, action) => {
			state.exchangeRateDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeNewExchangeRateDialog: (state, action) => {
			state.exchangeRateDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		openEditExchangeRateDialog: (state, action) => {
			state.exchangeRateDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload,
				selectedId: action.payload.ParentID
			};
		},
		closeEditExchangeRateDialog: (state, action) => {
			state.exchangeRateDialog = {
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
		[addExchangeRate.fulfilled]: exchangeRateAdapter.addOne,
		[updateExchangeRate.fulfilled]: exchangeRateAdapter.upsertOne,
		[getExchangeRateList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			exchangeRateAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewExchangeRateDialog,
	closeNewExchangeRateDialog,
	openEditExchangeRateDialog,
	closeEditExchangeRateDialog
} = exchangeRateSlice.actions;

export default exchangeRateSlice.reducer;
