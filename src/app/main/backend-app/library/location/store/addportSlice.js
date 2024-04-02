/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import JwtService from '../../../../../services/jwtService';
import { getPortList } from './loardPortSlice';

const apiUrl = process.env.REACT_APP_API_URL;

export const saveport = createAsyncThunk('todoApp/todos/saveport', async (portData, { dispatch, rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/glos/port `, {
			...portData
		});
		if (response.status === 200) {
			const data = await response.data;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			dispatch(getPortList());
			return data;
		}
	
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const updateport = createAsyncThunk('todoApp/todos/updateport', async (portData, { dispatch, rejectWithValue }) => {
	try {
		const { portID } = portData;
		const response = await axios.put(`${apiUrl}/glos/port/${portID}`, {
			...portData
		});
		if (response.status === 200) {
			const data = await response.data;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			dispatch(getPortList());
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const removePort = createAsyncThunk('todoApp/todos/removeport', async (deleteData, { dispatch, rejectWithValue }) => {
	try {
		const { portid, reason } = deleteData;
		const response = await axios.delete(`${apiUrl}/glos/port/${portid}`, {
			data: { reson: reason }
		});
		if (response.status === 200) {
			const data = await response.data;
			toast.success(data?.Msg, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: TOAST_TIME_OUT
			});
			dispatch(getPortList());
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const portSlice = createSlice({
	name: 'todoApp/todos',
	initialState: null,
	reducers: {
		resetUser: () => null
	},
	extraReducers: {
		[saveport.fulfilled]: (state, action) => action.payload
	}
});

export const { newUser, resetUser } = portSlice.actions;

export default portSlice.reducer;
