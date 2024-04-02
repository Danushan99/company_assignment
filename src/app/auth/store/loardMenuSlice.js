/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { loardMenuSecionurl, userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getLoardMenulist = createAsyncThunk('auth/loadMenu/getMenu', async () => {
	try {
		const response = await axios.get(`${apiUrl}/${loardMenuSecionurl.loadMenu}`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});
		if (response.status === 200) {
			const data = await response.data.Datas;
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		toast.error(error.message, {
			position: toast.POSITION.TOP_CENTER,
			// autoClose: 4000
		});
		return error.message;
	}
});

const menulistAdapter = createEntityAdapter({
	selectId: menu => menu.id
});

export const { selectAll: selectMenu, selectById: selectUserById } = menulistAdapter.getSelectors(
	state => state.auth.loadMenu
);

const systemMenuloardSlice = createSlice({
	name: 'auth/loadMenu',
	initialState: menulistAdapter.getInitialState({
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
		[getLoardMenulist.fulfilled]: menulistAdapter.setAll
	}
});

export const { setUsersSearchText } = systemMenuloardSlice.actions;

export default systemMenuloardSlice.reducer;
