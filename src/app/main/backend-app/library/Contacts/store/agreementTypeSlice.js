/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import JwtService from 'app/services/jwtService';
import { librarySectionUrl } from 'app/main/utils/apiUrlsDocumnet';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAgreementTypes = createAsyncThunk(
	'addressBookApp/agreementTypes/getAgreementTypes',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/${librarySectionUrl.contactsUrl}/agreementType`, {
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
	}
);

const agreementTypeAdapter = createEntityAdapter({
	selectId: agrType => agrType.TypeID
});

export const { selectAll: selectAgrTypes, selectById: selectAgrTypeById } = agreementTypeAdapter.getSelectors(
	state => state.addressBookApp.agreementTypes
);

const agreementTypeSlice = createSlice({
	name: 'addressBookApp/agreementTypes',
	initialState: agreementTypeAdapter.getInitialState({
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
		[getAgreementTypes.fulfilled]: agreementTypeAdapter.setAll
	}
});

export const { setSearchText } = agreementTypeSlice.actions;

export default agreementTypeSlice.reducer;
