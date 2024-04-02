import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getContainerTypes = createAsyncThunk(
	'contactTypeApp/contactTypes/getContainerTypes',
	async (routeParams, { getState, rejectWithValue }) => {
		try {
			routeParams = routeParams || getState().contactTypeApp.contactTypes.routeParams;
			const response = await axios.get(`${apiUrl}/${userSectionUrl.contacts}`, {
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

export const addContainerType = createAsyncThunk(
	'contactTypeApp/contactTypes/addContainerType',
	async (containerTypeData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/${userSectionUrl.addcontacts}`, containerTypeData);
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getContainerTypes());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 4000
				});
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateContainerType = createAsyncThunk(
	'contactTypeApp/contactTypes/updateContainerType',
	async (containerType, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${userSectionUrl.addcontacts}/${containerType?.ContactTypeID}`,
				containerType
			);
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getContainerTypes());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 4000
				});
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeContainerType = createAsyncThunk(
	'contactTypeApp/contactTypes/removeContainerType',
	async (formSubmittedData, { dispatch, rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${userSectionUrl.addcontacts}/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });
			if (response.status === 200) {
				const data = await response.data;
				dispatch(getContainerTypes());
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 4000
				});
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const containerTypesAdapter = createEntityAdapter({
	selectId: contactType => contactType.ContactTypeID
});

export const { selectAll: selectContainerTypes, selectById: selectContainerTypesById } =
	containerTypesAdapter.getSelectors(state => state.contactTypeApp.contactTypes);

const contactTypesSlice = createSlice({
	name: 'contactTypeApp/contactTypes',
	initialState: containerTypesAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		containerTypeDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setContainerTypeSearchText: {
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
		OpenNewContainerTypeDialog: (state, action) => {
			state.containerTypeDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		// close dialog when create new
		closeNewContainerTypeDialog: (state, action) => {
			state.containerTypeDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditContainerTypeDialog: (state, action) => {
			state.containerTypeDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditContainerTypeDialog: (state, action) => {
			state.containerTypeDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[addContainerType.fulfilled]: containerTypesAdapter.addOne,
		[updateContainerType.fulfilled]: containerTypesAdapter.upsertOne,
		[getContainerTypes.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			containerTypesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setContainerTypeSearchText,
	toggleOrderDescending,
	changeOrder,
	OpenNewContainerTypeDialog,
	closeNewContainerTypeDialog,
	openEditContainerTypeDialog,
	closeEditContainerTypeDialog
} = contactTypesSlice.actions;

export default contactTypesSlice.reducer;
