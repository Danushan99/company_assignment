/* eslint-disable consistent-return */
/* eslint-disable no-unreachable */
/* eslint-disable no-shadow */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllTarrif = createAsyncThunk(
	'MDLApp/gettariffs/getallTarrif',
	async ({ id, params }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.getarrifUrl}/${id}`, { params });


			if (response.status === 200) {
				const data = response.data?.datas || [];
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			alert("You must Enter Start Date and End date before the Search")
			//return rejectWithValue(error.message);
		}
	}
);

/**
 * Delete tariff
 */
export const removeTariff = createAsyncThunk(
	'MDLApp/gettariffs/removeTariff',
	async (formSubmittedData, { rejectWithValue, dispatch }) => {
		try {
			const url = `${apiUrl}/${MDLdepartmentUrl.tarrifUrl}/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });

			const data = await response.data;
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

const tarrifAdapter = createEntityAdapter({
	selectId: tarrif => tarrif.TariffID
});

export const { selectAll: selectAlltarrif, selectById: selectTarrifid } = tarrifAdapter.getSelectors(
	state => state.MDLApp.getalltariffs
);

const getTarrifSlice = createSlice({
	name: 'MDLApp/gettariffs',
	initialState: tarrifAdapter.getInitialState({
		searchText: '',
		rows: [],
		count: 0,
		pages: 0,
		tariffDetailsDialog: {
			type: 'view',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		},
		tariffEditDetailsDialog: {
			type: 'edit',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		},
		tariffComponetsDialog: {
			type: 'view',
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

		// open dialog when view
		OpenViewTariffDetailDialog: (state, action) => {
			state.tariffDetailsDialog = {
				type: 'view',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when view
		closeViewTariffDetailDialog: (state, action) => {
			state.tariffDetailsDialog = {
				type: 'view',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		// open dialog for edite
		OpenEditTariffDetailDialog: (state, action) => {
			state.tariffEditDetailsDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when edite
		closeedEditTariffDetailDialog: (state, action) => {
			state.tariffEditDetailsDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		// open dialog when view
		OpenViewTariffComponetDialog: (state, action) => {
			state.tariffComponetsDialog = {
				type: 'view',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when view
		closeViewTariffComponetDialog: (state, action) => {
			state.tariffComponetsDialog = {
				type: 'view',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		}
	},

	extraReducers: builder => {
		builder.addCase(getAllTarrif.fulfilled, (state, action) => {
			state.rows = action.payload.rows || [];
			state.count = action.payload.count || 0;
			state.pages = action.payload.pages || 0;
		});
	}
});

export const {
	setSearchText,
	OpenViewTariffDetailDialog,
	OpenEditTariffDetailDialog,
	closeedEditTariffDetailDialog,
	closeViewTariffDetailDialog,
	OpenViewTariffComponetDialog,
	closeViewTariffComponetDialog
} = getTarrifSlice.actions;

export default getTarrifSlice.reducer;
