/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAgreementList = createAsyncThunk(
	'agreementApp/agreements/getAgreementList',
	async ({ params }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.agreementUrl}`, {
				params
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

const agreementAdapter = createEntityAdapter({
	selectId: rate => rate.AgreementID
});

export const { selectAll: selectAgreements, selectById: selectAgreementsById } = agreementAdapter.getSelectors(
	state => state.agreementApp.agreements
);

const agrementSlice = createSlice({
	name: 'agreementApp/agreements',
	initialState: agreementAdapter.getInitialState({
		all: [],
		count: 0,
		pages: 0,
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
	extraReducers: builder => {
		builder.addCase(getAgreementList.fulfilled, (state, action) => {
			state.all = action.payload.data.rows || [];
			state.count = action.payload.data.count || 0;
			state.pages = action.payload.data.pages || 0;
		});
	}
	// extraReducers: {
	// 	[getAgreementList.fulfilled]: (state, action) => {
	// 		const { data, routeParams } = action.payload;
	// 		agreementAdapter.setAll(state, data);
	// 		state.routeParams = routeParams;
	// 		state.searchText = '';
	// 		state.all = data;
	// 	}
	// }
});

export const {
	setSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewExchangeRateDialog,
	closeNewExchangeRateDialog,
	openEditExchangeRateDialog,
	closeEditExchangeRateDialog
} = agrementSlice.actions;

export default agrementSlice.reducer;
