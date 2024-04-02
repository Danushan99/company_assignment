/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import JwtService from '../../../../../services/jwtService';
import { getCountrylist } from './loardCountrySlice';

const apiUrl = process.env.REACT_APP_API_URL;



export const saveCountry = createAsyncThunk(
	'todoApp/todos/savecountry',
	async (countryData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/glos/country`, {
				...countryData
			});
			if (response.status === 200) {
				const data = await response.data;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				dispatch(getCountrylist());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updatecountry = createAsyncThunk(
	'todoApp/todos/savecountry',
	async (countryData, { dispatch, rejectWithValue }) => {
		try {
			const { countryId } = countryData;
			const response = await axios.put(`${apiUrl}/glos/country/${countryId}`, {
				...countryData
			});
			if (response.status === 200) {
				const data = await response.data;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				dispatch(getCountrylist());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeCoutry = createAsyncThunk(
	'todoApp/todos/savecountry',
	async (deleteData, { dispatch , rejectWithValue}) => {
		try {
			const { countryid, reason } = deleteData;
			const response = await axios.delete(`${apiUrl}/glos/country/${countryid}`, {
				data: { reson: reason }
			});
			if (response.status === 200) {
				const data = await response.data;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				dispatch(getCountrylist());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const countrySlice = createSlice({
	name: 'todoApp/todos',
	initialState: null,
	reducers: {
		resetUser: () => null
	},
	extraReducers: {
		[saveCountry.fulfilled]: (state, action) => action.payload
	}
});

export const { newUser, resetUser } = countrySlice.actions;

export default countrySlice.reducer;
