/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAddressTypeList = createAsyncThunk(
	'addressTypeApp/adTypes/getAddressTypeList',
	async (routeParams, { getState, rejectWithValue }) => {
		try {
			routeParams = routeParams || getState().addressTypeApp.adTypes.routeParams;
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.addressTypeUrl}`, {
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

export const addAddressType = createAsyncThunk(
	'addressTypeApp/adTypes/addAddressType',
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${librarySectionUrl.addressTypeUrl}`, formData);

			if (response.status === 200) {
				const data = await response.data;
				dispatch(getAddressTypeList());
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

export const updateAddressType = createAsyncThunk(
	'addressTypeApp/adTypes/updateAddressType',
	async (formdata, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${librarySectionUrl.addressTypeUrl}/${formdata?.AddressTypeID}`,
				formdata
			);
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getAddressTypeList());
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

export const removeAddressType = createAsyncThunk(
	'addressTypeApp/adTypes/removeAddressType',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		const url = `${apiUrl}/${librarySectionUrl.addressTypeUrl}/${formSubmittedData?.ids}`;

		try {
			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getAddressTypeList());
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

const addressTypeAdapter = createEntityAdapter({
	selectId: adType => adType.AddressTypeID
});

export const { selectAll: selectAddressTypes, selectById: selectAddressTypeById } = addressTypeAdapter.getSelectors(
	state => state.addressTypeApp.adTypes
);

const addressTypeSlice = createSlice({
	name: 'addressTypeApp/adTypes',
	initialState: addressTypeAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		addressTypeDialog: {
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
		OpenNewAddressTypeDialog: (state, action) => {
			state.addressTypeDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeNewAddressTypeDialog: (state, action) => {
			state.addressTypeDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		openEditAddressTypeDialog: (state, action) => {
			state.addressTypeDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload,
				selectedId: action.payload.ParentID
			};
		},
		closeEditAddressTypeDialog: (state, action) => {
			state.addressTypeDialog = {
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
		[addAddressType.fulfilled]: addressTypeAdapter.addOne,
		[updateAddressType.fulfilled]: addressTypeAdapter.upsertOne,
		[getAddressTypeList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			addressTypeAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewAddressTypeDialog,
	closeNewAddressTypeDialog,
	openEditAddressTypeDialog,
	closeEditAddressTypeDialog
} = addressTypeSlice.actions;

export default addressTypeSlice.reducer;
