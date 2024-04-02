/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getUsers = createAsyncThunk('system/systemUsers/getUsers', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${userSectionUrl.usersUrl}`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});

		if (response.status === 200) {
			const data = await response.data.datas;
			if (data) {
				return data;
			}
			return null;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		//return rejectWithValue(error.message);
	}
});



export const removeUsers = createAsyncThunk(
	'system/systemUsers/removeUsers',
	async (userIds, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${apiUrl}/${userSectionUrl.usersUrl}/${userIds}`
				// {
				//   headers: { tokensapi: JwtService.getRefreshToken() },
				// }
			);
			if (response.status === 200) {
				const data = await response.data.datas;
				toast.success(data?.Msg, {
					position: toast.POSITION.TOP_CENTER,
					autoClose: TOAST_TIME_OUT
				});
			//	dispatch(getUsers());
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);


const usersAdapter = createEntityAdapter({
	selectId: user => user.UserID
});

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors(
	state => state.system.systemUsers
);

const systemUsersSlice = createSlice({
	name: 'system/systemUsers',
	initialState: usersAdapter.getInitialState({
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
		[getUsers.fulfilled]: usersAdapter.setAll
	}
});

export const { setUsersSearchText } = systemUsersSlice.actions;

export default systemUsersSlice.reducer;
