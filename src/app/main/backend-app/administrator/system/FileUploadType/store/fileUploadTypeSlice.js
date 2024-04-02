/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getFileUploadTypeList = createAsyncThunk(
	'fileUploadTypeApp/upTypes/getFileUploadTypeList',
	async (routeParams, { getState, rejectWithValue }) => {
		try {
			routeParams = routeParams || getState().fileUploadTypeApp.upTypes.routeParams;
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.fileUploadTypeUrl}`, {
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

export const addFileUploadType = createAsyncThunk(
	'fileUploadTypeApp/upTypes/addFileUploadType',
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${librarySectionUrl.fileUploadTypeUrl}`, formData);

			if (response.status === 200) {
				const data = await response.data;
				dispatch(getFileUploadTypeList());
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

export const updateFileUploadType = createAsyncThunk(
	'fileUploadTypeApp/upTypes/updateFileUploadType',
	async (formdata, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${librarySectionUrl.fileUploadTypeUrl}/${formdata?.TypeID}`,
				formdata
			);
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getFileUploadTypeList());
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

export const removeFileUploadType = createAsyncThunk(
	'fileUploadTypeApp/upTypes/removeFileUploadType',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.fileUploadTypeUrl}/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });
			if (response.status === 200) {
				const data = await response.data;

				dispatch(getFileUploadTypeList());
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

const fileUploadTypeAdapter = createEntityAdapter({
	selectId: upType => upType.TypeID
});

export const { selectAll: selectFileUploadTypes, selectById: selectFileUploadTypeById } =
	fileUploadTypeAdapter.getSelectors(state => state.fileUploadTypeApp.upTypes);

const fileUploadTypeSlice = createSlice({
	name: 'fileUploadTypeApp/upTypes',
	initialState: fileUploadTypeAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		fileUploadTypeDialog: {
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
		OpenNewFileUploadTypeDialog: (state, action) => {
			state.fileUploadTypeDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeNewFileUploadTypeDialog: (state, action) => {
			state.fileUploadTypeDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		openEditFileUploadTypeDialog: (state, action) => {
			state.fileUploadTypeDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload,
				selectedId: action.payload.ParentID
			};
		},
		closeEditFileUploadTypeDialog: (state, action) => {
			state.fileUploadTypeDialog = {
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
		[addFileUploadType.fulfilled]: fileUploadTypeAdapter.addOne,
		[updateFileUploadType.fulfilled]: fileUploadTypeAdapter.upsertOne,
		[getFileUploadTypeList.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			fileUploadTypeAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewFileUploadTypeDialog,
	closeNewFileUploadTypeDialog,
	openEditFileUploadTypeDialog,
	closeEditFileUploadTypeDialog
} = fileUploadTypeSlice.actions;

export default fileUploadTypeSlice.reducer;
