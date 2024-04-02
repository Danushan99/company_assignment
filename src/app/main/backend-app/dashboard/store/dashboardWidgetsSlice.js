import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('dashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('/api/analytics-dashboard-app/widgets');
  const data = await response.data;

  return data;
});

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgetsEntities, selectById: selectWidgetById } =
  widgetsAdapter.getSelectors((state) => state.dashboardApp.widgets);

const dashboardWidgetsSlice = createSlice({
  name: 'dashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll,
  },
});

export default dashboardWidgetsSlice.reducer;
