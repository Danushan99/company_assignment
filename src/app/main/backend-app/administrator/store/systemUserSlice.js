/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_TIME_OUT } from 'app/main/utils/commonConstant';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from '../../../../services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getUser = createAsyncThunk('system/systemUser/getUser', async params => {
	const response = await axios.get(`${apiUrl}/user/${params.userId}`);
	const data = await response.data.datas[0];
	return data === undefined ? null : data;
});

export const saveUser = createAsyncThunk(
	'system/systemUser/saveUser',
	async (userData, { rejectWithValue, getState }) => {
		try {
			const { systemUser } = getState().system;

			const response = await axios.post(`${apiUrl}/${userSectionUrl.usersUrl}`, {
				...systemUser,
				...userData
			});
			if (response.status === 200) {
				const data = await response.data;
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
	}
);

const systemUserSlice = createSlice({
	name: 'system/systemUser',
	initialState: null,
	reducers: {
		resetUser: () => null
		// newUser: {
		//   reducer: (state, action) => action.payload,
		//   prepare: (event) => ({
		//     payload: {
		//       UserName: '',
		//       pw: '',
		//       FirstName: '',
		//       LastName: '',
		//       JobTitle: [],
		//       Email: '',
		//       DOB:'',
		//       Gender: [],
		//       Company: [],
		//       JoinDate: new Date(),
		//       Extention: '',
		//       avatar: '',
		//       active: true,
		//     },
		//   }),
		// },
	},
	extraReducers: {
		[getUser.fulfilled]: (state, action) => action.payload,
		[saveUser.fulfilled]: (state, action) => action.payload
	}
});

export const { newUser, resetUser } = systemUserSlice.actions;

export default systemUserSlice.reducer;
