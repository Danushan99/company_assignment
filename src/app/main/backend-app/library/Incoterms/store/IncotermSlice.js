/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getIntercomList = createAsyncThunk(
	'IncortermApplibrary/incortermslibrary/getIntercomList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${userSectionUrl.incortermUrl}`);
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

export const addIntercomes = createAsyncThunk(
	'IncortermApplibrary/incortermslibrary/addIntercomes',
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${userSectionUrl.incortermUrl}`, formData);

			if (response.status === 200) {
				const data = await response.data;
				dispatch(getIntercomList());
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

export const updateIncorterm = createAsyncThunk(
	'IncortermApplibrary/incortermslibrary/updateIncorterm',
	async ({ formdata, id }, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(`${apiUrl}/${userSectionUrl.incortermUrl}/${id}`, formdata);
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getIntercomList());
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

export const removeIncoterm = createAsyncThunk(
	'IncortermApplibrary/incortermslibrary/removeIncoterm',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${userSectionUrl.incortermUrl}/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getIntercomList());
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

const IncotermAdapter = createEntityAdapter({
	selectId: interCom => interCom.IncoTermID
});

export const { selectAll: selectInterComs, selectById: selectInterComById } = IncotermAdapter.getSelectors(
	state => state.IncortermApplibrary.incortermslibrary
);

const incotermSlice = createSlice({
	name: 'IncortermApplibrary/incortermslibrary',
	initialState: IncotermAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		intercomDialog: {
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
		OpenNewIntercomeDialog: (state, action) => {
			state.intercomDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeNewIntercomeDialog: (state, action) => {
			state.intercomDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		openEditIntercomeDialog: (state, action) => {
			state.intercomDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload,
				selectedId: action.payload.ParentID
			};
		},
		closeEditIntercomeDialog: (state, action) => {
			state.intercomDialog = {
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
		[addIntercomes.fulfilled]: IncotermAdapter.addOne,
		[updateIncorterm.fulfilled]: IncotermAdapter.upsertOne,
		[getIntercomList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			IncotermAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewIntercomeDialog,
	closeNewIntercomeDialog,
	openEditIntercomeDialog,
	closeEditIntercomeDialog
} = incotermSlice.actions;

export default incotermSlice.reducer;
