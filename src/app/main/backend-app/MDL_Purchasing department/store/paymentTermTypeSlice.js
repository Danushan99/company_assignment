/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { MDLdepartmentUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all paymnet term  types */
export const getPaymentTermTypes = createAsyncThunk(
	'MDLApp/paymentTermTypes/getPaymentTermTypes',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${MDLdepartmentUrl.paymentTermTypeUrl}`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const resultData = await response.data?.datas;
				const data = resultData || [];

				return { data };
			}
			JwtService.autoLogoutRedirection();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const paymentTermTypeAdapter = createEntityAdapter({
	selectId: paymentTermType => paymentTermType.paymentID
});
export const { selectAll: selectPaymentTermTypes, selectById: selectPaymentTermTypeId } =
	paymentTermTypeAdapter.getSelectors(state => state.MDLApp.paymentTermTypes);

const paymentTermTypeSlice = createSlice({
	name: 'MDLApp/paymentTermTypes',
	initialState: paymentTermTypeAdapter.getInitialState({
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
		[getPaymentTermTypes.fulfilled]: paymentTermTypeAdapter.setAll
	}
});

export const { setSearchText } = paymentTermTypeSlice.actions;

export default paymentTermTypeSlice.reducer;
