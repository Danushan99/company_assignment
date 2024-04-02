/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all requsest tariffs */
export const getAllRequests = createAsyncThunk(
	'MDLApp/requests/getAllRequests',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.mdlUrl}/sendraterequest`, {
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
	}
);

/** get requsest tariffs by ID */
export const getRequestDetailsById = createAsyncThunk(
	'MDLApp/requests/getRequestDetailsById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.mdlUrl}/sendraterequest/tariff/${id}`, {
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
	}
);

/** get all requsest tariffs by vendor */
export const getAllRequestsByVendor = createAsyncThunk(
	'MDLApp/requests/getAllRequestsByVendor',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.mdlUrl}/sendraterequest/${id}`, {
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
	}
);

/** Add to cart function for send request */
export const addToCart = createAsyncThunk('MDLApp/requests/addToCart', async (formData, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/${MDLdepartmentUrl.mdlUrl}/addCart`, formData);
		const data = await response.data;
		if (response.status === 200) {
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			return data;
		}
		toast.error(data?.Msg, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: TOAST_TIME_OUT
		});
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

/** Add to archive function for send request */
export const addToArchive = createAsyncThunk('MDLApp/requests/addToArchive', async (formData, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/${MDLdepartmentUrl.mdlUrl}/tariffarchive`, formData);
		const data = await response.data;
		if (response.status === 200) {
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			return data;
		}
		toast.error(data?.Msg, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: TOAST_TIME_OUT
		});
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

/** Archive Tariff Restore ( Archive to Active ) */
export const archiveTariffRestore = createAsyncThunk(
	'MDLApp/requests/archiveTariffRestore',
	async (formData, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${MDLdepartmentUrl.mdlUrl}/tariffarchiverestor`, formData);
			const data = await response.data;
			if (response.status === 200) {
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				return data;
			}
			toast.error(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

/** remove request tariff */
export const removeRequest = createAsyncThunk(
	'MDLApp/requests/removeRequest',
	async (formSubmittedData, { rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${MDLdepartmentUrl.mdlUrl}/sendraterequest/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, {
				data: { reson: formSubmittedData?.reason, cart: formSubmittedData?.cart }
			});
			const data = await response.data;
			// dispatch(getChartOfAccountList());
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

const requestTariffAdapter = createEntityAdapter({
	selectId: vendor => vendor.VenderID
});
export const { selectAll: selectRequests, selectById: selectRequestId } = requestTariffAdapter.getSelectors(
	state => state.MDLApp.requests
);

const requestTariffSlice = createSlice({
	name: 'MDLApp/requests',
	initialState: requestTariffAdapter.getInitialState({
		searchText: '',
		tariffRequestsDialog: {
			type: 'view',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		},
		RateRequestsDialog: {
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
		OpenRateRequestTariffsDialog: (state, action) => {
			state.RateRequestsDialog = {
				type: 'view',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when view
		closeRateRequestTariffDialog: (state, action) => {
			state.RateRequestsDialog = {
				type: 'view',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		// open dialog when view
		OpenRequestTariffDetailDialog: (state, action) => {
			state.tariffRequestsDialog = {
				type: 'view',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when view
		closeRequestTariffDetailDialog: (state, action) => {
			state.tariffRequestsDialog = {
				type: 'view',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		}
	},
	extraReducers: {
		[getAllRequests.fulfilled]: requestTariffAdapter.setAll,
		[getAllRequestsByVendor.fulfilled]: requestTariffAdapter.setAll,
		[getRequestDetailsById.fulfilled]: requestTariffAdapter.setAll,
		[addToCart.fulfilled]: requestTariffAdapter.addOne
	}
});

export const {
	setSearchText,
	OpenRateRequestTariffsDialog,
	closeRateRequestTariffDialog,
	OpenRequestTariffDetailDialog,
	closeRequestTariffDetailDialog
} = requestTariffSlice.actions;

export default requestTariffSlice.reducer;
