/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';

const apiUrl = process.env.REACT_APP_API_URL;

export const getPayTypes = createAsyncThunk('addressBookApp/payTypes/getPayTypes', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/payType`, {
			headers: { tokensapi: JwtService.getRefreshToken() }
		});
		if (response.status === 200) {
			const data = response.data?.datas || [];
			return data;
		}
		JwtService.autoLogoutRedirection();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const payTypeAdapter = createEntityAdapter({
	selectId: payType => payType.TypeID
});

export const { selectAll: selectPayTypes, selectById: selectPayTypeById } = payTypeAdapter.getSelectors(
	state => state.addressBookApp.payTypes
);

const payTypeSlice = createSlice({
	name: 'addressBookApp/payTypes',
	initialState: payTypeAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPayTypes.fulfilled]: payTypeAdapter.setAll
	}
});

export const { setSearchText } = payTypeSlice.actions;

export default payTypeSlice.reducer;
