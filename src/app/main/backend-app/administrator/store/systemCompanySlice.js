/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { userSectionUrl } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export const getCompanylist = createAsyncThunk('system/systemCompany/getCompany', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${userSectionUrl.company}`, {
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

const comapanylistAdapter = createEntityAdapter({
	selectId: company => company.CompanyID
});

export const { selectAll: selectCompanies, selectById: selectUserById } = comapanylistAdapter.getSelectors(
	state => state.system.systemCompany
);

const systemCompanySlice = createSlice({
	name: 'system/systemCompany',
	initialState: comapanylistAdapter.getInitialState({
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
		[getCompanylist.fulfilled]: comapanylistAdapter.setAll
		// [removeProducts.fulfilled]: (state, action) =>
		// usersAdapter.removeMany(state, action.payload),
	}
});

export const { setUsersSearchText } = systemCompanySlice.actions;

export default systemCompanySlice.reducer;
