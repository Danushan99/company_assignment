/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getChartOfAccountList = createAsyncThunk(
	'chartOfAccountApp/accounts/getChartOfAccountList',
	async (routeParams, { getState, rejectWithValue }) => {
		try {
			routeParams = routeParams || getState().chartOfAccountApp.accounts.routeParams;
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.chartOfAccountUrl}/chartofaccount_all`, {
				params: routeParams
			});

			if (response.status === 200) {
				const resultData = await response.data?.datas;
				const data = resultData || [];

				return { data, routeParams };
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addChartOfAccount = createAsyncThunk(
	'chartOfAccountApp/accounts/addChartOfAccount',
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${apiUrl}/${librarySectionUrl.chartOfAccountUrl}/chartofaccount`,
				formData
			);

			const data = await response.data;
			dispatch(getChartOfAccountList());
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateChartOfAccount = createAsyncThunk(
	'chartOfAccountApp/accounts/updateChartOfAccount',
	async (formdata, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${librarySectionUrl.chartOfAccountUrl}/chartofaccount/${formdata?.ChartOfAccountID}`,
				formdata
			);
			const data = await response.data;
			dispatch(getChartOfAccountList());
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeChartOfAccount = createAsyncThunk(
	'chartOfAccountApp/accounts/removeChartOfAccount',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.chartOfAccountUrl}/chartofaccount/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });
			const data = await response.data;
			dispatch(getChartOfAccountList());
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const chartOfAccountAdapter = createEntityAdapter({
	selectId: account => account.ChartOfAccountID
});

export const { selectAll: selectChartOfAccounts, selectById: selectChartOfAccountById } =
	chartOfAccountAdapter.getSelectors(state => state.chartOfAccountApp.accounts);

const chartOfAccountSlice = createSlice({
	name: 'chartOfAccountApp/accounts',
	initialState: chartOfAccountAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		chartOfAccountDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		}
	}),
	reducers: {
		setChartOfAccountSearchText: {
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
		OpenNewchartOfAccountDialog: (state, action) => {
			state.chartOfAccountDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeNewchartOfAccountDialog: (state, action) => {
			state.chartOfAccountDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		openEditchartOfAccountDialog: (state, action) => {
			state.chartOfAccountDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload,
				selectedId: action.payload.ParentID
			};
		},
		closeEditchartOfAccountDialog: (state, action) => {
			state.chartOfAccountDialog = {
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
		[addChartOfAccount.fulfilled]: chartOfAccountAdapter.addOne,
		[updateChartOfAccount.fulfilled]: chartOfAccountAdapter.upsertOne,
		[getChartOfAccountList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			chartOfAccountAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setChartOfAccountSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewchartOfAccountDialog,
	closeNewchartOfAccountDialog,
	openEditchartOfAccountDialog,
	closeEditchartOfAccountDialog
} = chartOfAccountSlice.actions;

export default chartOfAccountSlice.reducer;
