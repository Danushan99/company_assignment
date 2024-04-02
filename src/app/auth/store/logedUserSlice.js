/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const apiUrl = process.env.REACT_APP_API_URL;

export const getUser = createAsyncThunk('auth/logUser/getUser', async () => {
	try {
		const response = await axios.get(`${apiUrl}/${userSectionUrl.usersUrl}`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});
		if (response.status === 200) {
			const data = await response.data.datas;
			return data;
		}

		JwtService.autoLogoutRedirection();
	} catch (error) {
		toast.error(error.message, {
			position: toast.POSITION.TOP_CENTER
			// autoClose: 4000
		});
		return error.message;
	}
});

// type User = { UserID: number};
const userAdapter = createEntityAdapter({
	
	selectId: user => user.UserID
});

export const { selectAll: selectUser, selectById: selectUserById } = userAdapter.getSelectors(
	state => state.auth.logUser
);

const logUsersSlice = createSlice({
	name: 'auth/logUser',
	initialState: userAdapter.getInitialState({
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
		[getUser.fulfilled]: userAdapter.setAll
		
	}
});

export const { setUsersSearchText } = logUsersSlice.actions;

export default logUsersSlice.reducer;
