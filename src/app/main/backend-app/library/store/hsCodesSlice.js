import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getHSCodes = createAsyncThunk(
	'hsCodeApp/hsCodes/getHSCodes',
	async (routeParams, { getState, rejectWithValue }) => {
		try {
			routeParams = routeParams || getState().hsCodeApp.hsCodes.routeParams;
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.hsCodeUrl}`, {
				headers: { tokensapi: JwtService.getRefreshToken() },
				params: routeParams
			});
			if (response.status === 200) {
				const data = await response.data.datas;
				return { data, routeParams };
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addHSCode = createAsyncThunk(
	'hsCodeApp/hsCodes/addHSCode',
	async (hsCodeData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${librarySectionUrl.hsCodeUrl}`, {
				headers: { tokensapi: JwtService.getRefreshToken() },
				...hsCodeData
			});
			const data = await response.data;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});

			dispatch(getHSCodes());

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeHSCode = createAsyncThunk(
	'hsCodeApp/hsCodes/removeHSCode',
	async (removeId, HsCodeData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.delete(`${apiUrl}/${librarySectionUrl.hsCodeUrl}/${removeId}`, {
				headers: { tokensapi: JwtService.getRefreshToken() },
				data: HsCodeData
			});

			if (response.status === 200) {
				const data = await response.data.datas;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				dispatch(getHSCodes());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const hsCodesAdapter = createEntityAdapter({
	selectId: hsCode => hsCode.HSCodeID
});

export const { selectAll: selectHsCodes, selectById: selectHsCodesById } = hsCodesAdapter.getSelectors(
	state => state.hsCodeApp.hsCodes
);

const hsCodesSlice = createSlice({
	name: 'hsCodeApp/todos',
	initialState: hsCodesAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		hsCodeDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setHSCodeSearchText: {
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
		openNewHSCodeDialog: (state, action) => {
			state.hsCodeDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewHSCodeDialog: (state, action) => {
			state.hsCodeDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditHSCodeDialog: (state, action) => {
			state.hsCodeDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditHSCodeDialog: (state, action) => {
			state.hsCodeDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		// [updateHSCode.fulfilled]: hsCodesAdapter.upsertOne,
		[addHSCode.fulfilled]: hsCodesAdapter.addOne,
		[getHSCodes.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			hsCodesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setHSCodeSearchText,
	toggleOrderDescending,
	changeOrder,
	openNewHSCodeDialog,
	closeNewHSCodeDialog,
	openEditHSCodeDialog,
	closeEditHSCodeDialog
} = hsCodesSlice.actions;

export default hsCodesSlice.reducer;
