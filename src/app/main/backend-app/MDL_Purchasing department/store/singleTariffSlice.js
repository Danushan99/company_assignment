/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

export const getOneTariff = createAsyncThunk(
	'MDLApp/singleTariff/getOneTariff',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.tarrifUrl}/${params}`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const data = response.data?.datas || {};
				return data;
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const singleTariffSlice = createSlice({
	name: 'MDLApp/singleTariff',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getOneTariff.fulfilled]: (state, action) => action.payload
	}
});

export default singleTariffSlice.reducer;
