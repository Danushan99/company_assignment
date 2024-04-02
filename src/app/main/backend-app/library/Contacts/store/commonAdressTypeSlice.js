/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get common address types */
export const getCommonAdressTypes = createAsyncThunk(
	'commonApp/commonAddressTypes/getCommonAdressTypes',
	async (_, {rejectWithValue}) => {
		try {
			const response = await axios.get(`${apiUrl}/${commonUrl.commonAddresstypeUrl}`, {
				headers: { tokensapi: JwtService.getRefreshToken() }
			});
			if (response.status === 200) {
				const resultData = await response.data?.datas;
				const data = resultData || [];

				return { data };
			}
			JwtService.autoLogoutRedirection();
		}catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const commonAdressTypesAdapter = createEntityAdapter({
	selectId: addrType => addrType.AddressTypeID
});
export const { selectAll: selectAllAddress, selectById: selectAddressId } = commonAdressTypesAdapter.getSelectors(
	state => state.commonApp.commonAddressTypes
);

const commonAdressTypeSlice = createSlice({
	name: 'commonApp/commonAddressTypes',
	initialState: commonAdressTypesAdapter.getInitialState({
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
		[getCommonAdressTypes.fulfilled]: commonAdressTypesAdapter.setAll
	}
});

export const { setSearchText } = commonAdressTypeSlice.actions;

export default commonAdressTypeSlice.reducer;
