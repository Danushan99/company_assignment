/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import JwtService from '../../../../../services/jwtService';
import { getCitylist } from './loardCitySlice';

const apiUrl = process.env.REACT_APP_API_URL;

export const saveCity = createAsyncThunk('todoApp/todos/savecity', async (cityData, { dispatch, rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/glos/city`, {
			...cityData
		});
		if (response.status === 200) {
			const data = await response.data;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			dispatch(getCitylist());
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const updatecity = createAsyncThunk('todoApp/todos/updatecity', async (cityData, { dispatch, rejectWithValue }) => {
	try {
		const { cityid } = cityData;
		const response = await axios.put(`${apiUrl}/glos/city/${cityid}`, {
			...cityData
		});
		if (response.status === 200) {
			const data = await response.data;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			dispatch(getCitylist());
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const removeCity = createAsyncThunk('todoApp/todos/removecity', async (deleteData, { dispatch, rejectWithValue }) => {
	try {
		const { cityid, reason } = deleteData;
		const response = await axios.delete(`${apiUrl}/glos/city/${cityid}`, {
			data: { reson: reason }
		});
		if (response.status === 200) {
			const data = await response.data;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			dispatch(getCitylist());
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const citySlice = createSlice({
	name: 'todoApp/todos',
	initialState: null,
	reducers: {
		resetUser: () => null
	},
	extraReducers: {
		[saveCity.fulfilled]: (state, action) => action.payload
	}
});

export const { newUser, resetUser } = citySlice.actions;

export default citySlice.reducer;
