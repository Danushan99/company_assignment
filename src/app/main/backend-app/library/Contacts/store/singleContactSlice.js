/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getOneContact = createAsyncThunk(
	'addressBookApp/contact/getOneContact',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/${params?.contactId}`,
				{
					headers: { tokensapi: JwtService.getRefreshToken() }
				}
			);
			if (response.status === 200) {
				const data = response.data?.datas || {};
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const viewContact = createAsyncThunk(
	'addressBookApp/contact/viewContact',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/${params}`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas || {};
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

/**
 * Add new contact
 */
export const saveContact = createAsyncThunk(
	'addressBookApp/contact/saveContact',
	async (contactData, { rejectWithValue, dispatch, getState }) => {
		try {
			const response = await axios.post(`${apiUrl}/${librarySectionUrl.contactsUrl}/contact`, {
				...contactData
			});

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

/**
 * Update  contact
 */
export const updateContact = createAsyncThunk(
	'addressBookApp/contact/updateContact',
	async ({ contactData, id }, { rejectWithValue, dispatch, getState }) => {
		try {
			const response = await axios.put(`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/${id}`, {
				...contactData
			});

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

/**
 * Update  contact Basic
 */
export const updateContactBasicInfo = createAsyncThunk(
	'addressBookApp/contact/updateContactBasicInfo',
	async ({ contactData, id }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactBasic/${id}`, {
				...contactData
			});

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
/**
 * Update Adreess contact
 */
export const updateAddressContact = createAsyncThunk(
	'addressBookApp/contact/updateAddressContact',
	async ({ contactData, id }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactAddress/${id}`,
				{
					...contactData
				}
			);

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

/**
 * Update  contact Person
 */
export const updateContactPerson = createAsyncThunk(
	'addressBookApp/contact/updateContactPerson',
	async ({ contactData, id }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactPerson/${id}`, {
				...contactData
			});

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

/**
 * Update  contact Employee
 */
export const updateContactEmployee = createAsyncThunk(
	'addressBookApp/contact/updateContactEmployee',
	async ({ contactData, id }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactEmploye/${id}`,
				{
					...contactData
				}
			);

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
/**
 * Update Agreement contact
 */
export const updateAgreementContact = createAsyncThunk(
	'addressBookApp/contact/updateAgreementContact',
	async ({ contactData, id }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactAgreement/${id}`,
				{
					...contactData
				}
			);

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

/**
 * Delete employee of contact
 */
export const removeContactEmploye = createAsyncThunk(
	'addressBookApp/contacts/removeContactEmploye',
	async (formSubmittedData, { rejectWithValue, dispatch }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactEmploye/${formSubmittedData?.id}`;

			const response = await axios.delete(url, {
				data: { reson: formSubmittedData?.reson, key: formSubmittedData?.key }
			});
			const data = await response.data;
			dispatch(getOneContact(data?.datas?.id));
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

/**
 * Delete person of contact
 */
export const removeContactPerson = createAsyncThunk(
	'addressBookApp/contacts/removeContactPerson',
	async (formSubmittedData, { rejectWithValue, dispatch }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactPerson/${formSubmittedData?.id}`;

			const response = await axios.delete(url, {
				data: { reson: formSubmittedData?.reson, key: formSubmittedData?.key }
			});
			const data = await response.data;
			dispatch(getOneContact(data?.datas?.id));
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

/**
 * Delete agreement of contact
 */
export const removeContactAgreement = createAsyncThunk(
	'addressBookApp/contacts/removeContactAgreement',
	async (formSubmittedData, { rejectWithValue, dispatch }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactAgreement/${formSubmittedData?.id}`;

			const response = await axios.delete(url, {
				data: { reson: formSubmittedData?.reson, key: formSubmittedData?.key }
			});
			const data = await response.data;
			dispatch(getOneContact(data?.datas?.id));
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

/**
 * Delete other company of basic info
 */
export const removeContactCompany = createAsyncThunk(
	'addressBookApp/contacts/removeContacts',
	async (formSubmittedData, { rejectWithValue, dispatch }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.contactsUrl}/contact/companyName/${formSubmittedData?.id}`;

			const response = await axios.delete(url, {
				data: { reson: formSubmittedData?.reson, key: formSubmittedData?.key }
			});
			const data = await response.data;
			dispatch(getOneContact(data?.datas?.id));
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

/**
 * Delete address of contact
 */
export const removeContactAddress = createAsyncThunk(
	'addressBookApp/contacts/removeContactAddress',
	async (formSubmittedData, { rejectWithValue, dispatch }) => {
		try {
			const url = `${apiUrl}/${librarySectionUrl.contactsUrl}/contact/contactAddress/${formSubmittedData?.id}`;

			const response = await axios.delete(url, {
				data: { reson: formSubmittedData?.reson, key: formSubmittedData?.key }
			});
			const data = await response.data;
			dispatch(getOneContact(data?.datas?.id));
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

const singleContactSlice = createSlice({
	name: 'addressBookApp/contact',
	initialState: null,
	reducers: {
		resetContact: () => null,
		newContact: {
			reducer: (state, action) => action.payload
		}
	},
	extraReducers: {
		[getOneContact.fulfilled]: (state, action) => action.payload,
		[viewContact.fulfilled]: (state, action) => action.payload,
		[saveContact.fulfilled]: (state, action) => action.payload,
		[updateContact.fulfilled]: (state, action) => action.payload,
		[updateContactBasicInfo.fulfilled]: (state, action) => action.payload,
		[updateAddressContact.fulfilled]: (state, action) => action.payload,
		[updateContactPerson.fulfilled]: (state, action) => action.payload,
		[updateContactEmployee.fulfilled]: (state, action) => action.payload,
		[updateAgreementContact.fulfilled]: (state, action) => action.payload
	}
});

export const { newContact, resetContact } = singleContactSlice.actions;

export default singleContactSlice.reducer;
