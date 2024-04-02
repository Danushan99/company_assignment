/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const saveTarrif = createAsyncThunk('MDLApp/tariffs/saveTarrif', async (formData, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/${MDLdepartmentUrl.tarrifUrl}`, formData);
		const data = await response.data;
		if (response.status === 200) {
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
});

export const editeTarrif = createAsyncThunk('MDLApp/tariffs/editeTarrif', async (formData, { rejectWithValue }) => {
	try {
		const tarridid = formData?.datas?.tariffId;
		const response = await axios.put(`${apiUrl}/${MDLdepartmentUrl.tarrifUrl}/${tarridid}`, formData);
		const data = await response.data;
		if (response.status === 200) {
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
});

/** remove  tariff componet*/
export const removeComponet = createAsyncThunk(
	'MDLApp/tariffs/removeComponet',
	async (formSubmittedData, { rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${MDLdepartmentUrl.tarrifUrl}/component/${formSubmittedData?.id}`;

			const response = await axios.delete(url, {
				data: {
					reson: formSubmittedData?.reason,
					credits: formSubmittedData?.credits,
					debits: formSubmittedData?.debits
				}
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

/** remove  tariff componet*/
export const removeFreeType = createAsyncThunk(
	'MDLApp/tariffs/removeFreeType',
	async (formSubmittedData, { rejectWithValue }) => {
		try {
			const url = `${apiUrl}/${MDLdepartmentUrl.tarrifUrl}/freeTimes/${formSubmittedData?.id}`;

			const response = await axios.delete(url, {
				data: {
					reson: formSubmittedData?.reason,
					freetimes: formSubmittedData?.freetimes
				}
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

const tarrifSlice = createSlice({
	name: 'MDLApp/tariffs',
	initialState: null,
	reducers: {
		resetTariff: () => null
	},
	extraReducers: {
		[saveTarrif.fulfilled]: (state, action) => action.payload,
		[editeTarrif.fulfilled]: (state, action) => action.payload
	}
});

export const { newUser, resetTariff } = tarrifSlice.actions;

export default tarrifSlice.reducer;
