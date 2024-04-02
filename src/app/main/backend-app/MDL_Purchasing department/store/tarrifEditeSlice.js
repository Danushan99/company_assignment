/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getOneEditeTariff = createAsyncThunk(
	'MDLApp/tarrifEdite/getOneEditeTariff',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.tarrifUrl}/${params}`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas[0] || {};
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const tarrifEditeSlice = createSlice({
	name: 'MDLApp/tarrifEdite',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getOneEditeTariff.fulfilled]: (state, action) => action.payload
	}
});

export default tarrifEditeSlice.reducer;
