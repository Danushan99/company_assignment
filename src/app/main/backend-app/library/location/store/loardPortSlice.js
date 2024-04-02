/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getPortList = createAsyncThunk('todoApp/ports/getport', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/glos/port`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});
		if (response.status === 200) {
			const data = await response.data.datas;
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const portlistAdapter = createEntityAdapter({
	selectId: cities => cities.PortID
});

export const { selectAll: selectPorts, selectById: selectUserById } = portlistAdapter.getSelectors(
	state => state.todoApp.ports
);

const loardPortSlice = createSlice({
	name: 'todoApp/ports',
	initialState: portlistAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setUsersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPortList.fulfilled]: portlistAdapter.setAll
	}
});

export const { setUsersSearchText } = loardPortSlice.actions;

export default loardPortSlice.reducer;
