/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';
import { API_DATA_LIMIT, TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;
const paramsData = {
	limits: API_DATA_LIMIT
};

/**
 * All Contacts
 */
export const getContacts = createAsyncThunk(
	'addressBookApp/contacts/getContacts',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/searchContact/`, {
				params,
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas || [];
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

/**
 * Search Agreement by customer id
 */
export const searchAgreementByCustomerId = createAsyncThunk(
	'addressBookApp/contacts/searchAgreementByCustomerId',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/searchAgreement/${id}`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas || [];
				console.log('response--', response);
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getAllContacts = createAsyncThunk(
	'addressBookApp/contacts/getAllContacts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/searchContact/all`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas || [];
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

/**
 * Starres contacts
 */
export const getContactsStarred = createAsyncThunk(
	'addressBookApp/contacts/getContactsStarred',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/searchContact/starred/`, {
				params,
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas || [];
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

/**
 * Frequently contacts
 */
export const getContactsFrequently = createAsyncThunk(
	'addressBookApp/contacts/getContactsFrequently',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/searchContact/frequently/`, {
				params,
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas || [];
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

/**
 * Update Started of contact
 */
export const updateStarredContact = createAsyncThunk(
	'addressBookApp/contacts/updateStarredContact',
	async (contact, { rejectWithValue, dispatch, getState }) => {
		try {
			const response = await axios.post(`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/starred`, contact);
			const data = await response.data;

			dispatch(getContacts(paramsData));

			if (response.status === 200) {
				return data;
			}
			JwtService.autoLogoutRedirection();
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// export const updateContact = createAsyncThunk(
// 	'addressBookApp/contacts/updateContact',
// 	async (contact, { dispatch, getState }) => {
// 		const response = await axios.post('/api/contacts-app/update-contact', { contact });
// 		const data = await response.data;

// 		dispatch(getContacts());

// 		return data;
// 	}
// );

/**
 * Delete Started of contact
 */
export const removeContacts = createAsyncThunk(
	'addressBookApp/contacts/removeContacts',
	async (formSubmittedData, { rejectWithValue, dispatch }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.contactsUrl}/contact/${formSubmittedData?.ids}`;

			const response = await axios.delete(url, { data: { reson: formSubmittedData?.reason } });

			const data = await response.data;
			dispatch(getContacts(paramsData));
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

const contactsAdapter = createEntityAdapter({
	selectId: contact => contact.ContactID
});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.addressBookApp.contacts
);

const contactsSlice = createSlice({
	name: 'addressBookApp/contacts',
	initialState: contactsAdapter.getInitialState({
		all: [],
		rows: [],
		count: 0,
		pages: 0,
		searchText: '',
		contactDetailsDialog: {
			type: 'view',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		}
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},

		// open dialog when view
		OpenViewContactDetailDialog: (state, action) => {
			state.contactDetailsDialog = {
				type: 'view',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when view
		closeViewContactDetailDialog: (state, action) => {
			state.contactDetailsDialog = {
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
		builder
			.addCase(getContacts.fulfilled, (state, action) => {
				contactsAdapter.setAll(state, action.payload?.rows);
				state.count = action.payload.count || 0;
				state.pages = action.payload.pages;
				state.rows = action.payload.rows;
				state.type = '';
			})
			.addCase(getContactsStarred.fulfilled, (state, action) => {
				contactsAdapter.setAll(state, action.payload?.rows);
				state.count = action.payload.count || 0;
				state.pages = action.payload.pages;
				state.rows = action.payload.rows;
				state.type = 'filterd';
			})
			.addCase(getContactsFrequently.fulfilled, (state, action) => {
				contactsAdapter.setAll(state, action.payload?.rows);
				state.count = action.payload.count || 0;
				state.pages = action.payload.pages;
				state.rows = action.payload.rows;
				state.type = 'filterd';
			})
			.addCase(getAllContacts.fulfilled, (state, action) => {
				contactsAdapter.setAll(state, action.payload?.rows);
				state.count = action.payload.count || 0;
				state.pages = action.payload.pages;
				state.all = action.payload.rows;
				state.type = '';
				state.rows = [];
			});
	}
});

export const { setContactsSearchText, OpenViewContactDetailDialog, closeViewContactDetailDialog } =
	contactsSlice.actions;

export default contactsSlice.reducer;
