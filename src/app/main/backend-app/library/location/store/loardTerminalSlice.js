/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getTerminallist = createAsyncThunk('todoApp/terminal/getterminal', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/glos/terminal`, {
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


const terminallistAdapter = createEntityAdapter({
	selectId: country => country.TerminalID
});

export const { selectAll: selectTerminal, selectById: selectUserById } = terminallistAdapter.getSelectors(
	state => state.todoApp.terminal
);

const loardTerminalSlice = createSlice({
	name: 'todoApp/terminal',
	initialState: terminallistAdapter.getInitialState({
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
		[getTerminallist.fulfilled]: terminallistAdapter.setAll
		// [removeProducts.fulfilled]: (state, action) =>
		// usersAdapter.removeMany(state, action.payload),
	}
});

export const { setUsersSearchText } = loardTerminalSlice.actions;

export default loardTerminalSlice.reducer;
