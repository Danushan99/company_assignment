/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import JwtService from '../../../../../services/jwtService';
import { getTerminallist } from './loardTerminalSlice';

const apiUrl = process.env.REACT_APP_API_URL;

export const saveterminal = createAsyncThunk(
	'todoApp/todos/saveterminal',
	async (terminalData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post(`${apiUrl}/glos/terminal `, {
				...terminalData
			});
			if (response.status === 200) {
				const data = await response.data;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				dispatch(getTerminallist());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateTerminal = createAsyncThunk(
	'todoApp/todos/updateterminal',
	async (terminalData, { dispatch, rejectWithValue }) => {
		try {
			const { terminalID } = terminalData;
			const response = await axios.put(`${apiUrl}/glos/terminal/${terminalID}`, {
				...terminalData
			});
			if (response.status === 200) {
				const data = await response.data;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				dispatch(getTerminallist());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const removeTerminal = createAsyncThunk(
	'todoApp/todos/removeport',
	async (deleteData, { dispatch, rejectWithValue }) => {
		try {
			const { terminalid, reason } = deleteData;
			const response = await axios.delete(`${apiUrl}/glos/terminal/${terminalid}`, {
				data: { reson: reason }
			});
			if (response.status === 200) {
				const data = await response.data;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
				dispatch(getTerminallist());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const terminalSlice = createSlice({
	name: 'todoApp/todos',
	initialState: null,
	reducers: {
		resetUser: () => null
	},
	extraReducers: {
		[saveterminal.fulfilled]: (state, action) => action.payload
	}
});

export const { newUser, resetUser } = terminalSlice.actions;

export default terminalSlice.reducer;
