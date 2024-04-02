/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/** get all port */
export const getAllPorts = createAsyncThunk('commonApp/ports/getAllPorts', async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/${commonUrl.portUrl}`, {
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
});

const portAdapter = createEntityAdapter({
	selectId: port => port.PortID
});
export const { selectAll: selectPorts, selectById: selectPortId } = portAdapter.getSelectors(
	state => state.commonApp.ports
);

const portSlice = createSlice({
	name: 'commonApp/ports',
	initialState: portAdapter.getInitialState({
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
		[getAllPorts.fulfilled]: portAdapter.setAll
	}
});

export const { setSearchText } = portSlice.actions;

export default portSlice.reducer;
