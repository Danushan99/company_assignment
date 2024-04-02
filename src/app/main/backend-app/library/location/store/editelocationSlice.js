/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { commonUrl } from 'app/main/utils/apiUrlsDocumnet';
import JwtService from 'app/services/jwtService';

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * All Location
 */
export const getLocations = createAsyncThunk('todoApp/todos/getLocations', async (routeParams, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiUrl}/${commonUrl?.allLocationUrl}`);

        if (response.status === 200) {
            const data = response.data?.datas || [];
            return data;
        }
        JwtService.autoLogoutRedirection();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addTodo = createAsyncThunk('todoApp/todos/addTodo', async (todo, { dispatch, getState }) => {
    const response = await axios.post('https://dev.mtcs.online/api/glos/country', todo);
    const data = await response.data;

    dispatch(getLocations());

    return data;
});

export const updateTodo = createAsyncThunk('todoApp/todos/updateTodo', async (todo, { dispatch, getState }) => {
    const response = await axios.post('/api/todo-app/update-todo', todo);
    const data = await response.data;

    dispatch(getLocations());

    return data;
});

export const removeTodo = createAsyncThunk('todoApp/todos/removeTodo', async (todoId, { dispatch, getState }) => {
    const response = await axios.post('/api/todo-app/remove-todo', todoId);
    const data = await response.data;

    dispatch(getLocations());

    return data;
});

const todosAdapter = createEntityAdapter({
    selectId: location => location.key
});

export const { selectAll: selectLocations, selectById: selectLocationById } = todosAdapter.getSelectors(
    state => state.todoApp.todos
);

const todosSlice = createSlice({
    name: 'todoApp/todos',
    initialState: todosAdapter.getInitialState({
        searchText: '',
        orderBy: '',
        orderDescending: false,
        routeParams: {},
        todoDialog: {
            type: 'new',
            props: {
                open: false
            },
            data: null
        }
    }),
    reducers: {
        setSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        },
        toggleOrderDescending: (state, action) => {
            state.orderDescending = !state.orderDescending;
        },
        changeOrder: (state, action) => {
            state.orderBy = action.payload;
        },
        openNewTodoDialog: (state, action) => {
            state.todoDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: null
            };
        },
        openNewEditeTodoDialog: (state, action) => {
            state.todoDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
        openEditTodoDialog: (state, action) => {
            state.todoDialog = {
                type: 'edit',
                props: {
                    open: true
                },
                data: action.payload
            };
        },
        closeEditTodoDialog: (state, action) => {
            state.todoDialog = {
                type: 'edit',
                props: {
                    open: false
                },
                data: null
            };
        }
    },
    extraReducers: {
        [updateTodo.fulfilled]: todosAdapter.upsertOne,
        [addTodo.fulfilled]: todosAdapter.addOne,
        [getLocations.fulfilled]: (state, action) => {
            todosAdapter.setAll(state, action.payload?.data || []);
            state.searchText = '';
        }
    }
});

export const {
    setSearchText,
    toggleOrderDescending,
    changeOrder,
    openNewEditeTodoDialog,
    closeNewTodoDialog,
    openEditTodoDialog,
    closeEditTodoDialog
} = todosSlice.actions;

export default todosSlice.reducer;
