import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Видео, с помощью которого писали код: https://www.youtube.com/watch?v=6RTbC8Acj1M
export const fetchUsers = createAsyncThunk(
    'usersInfo/fetchUsers',
    async function(_, {rejectWithValue}) { 
        const sourceUrl = "https://jsonplaceholder.typicode.com/users";
        const fetch_options = {
          method: 'GET',
        };   
        
        try {
            const response = await fetch(sourceUrl, fetch_options);

            if(response.ok) return await response.json();
            else throw new Error("BAD RESPONSE STATUS: " + response.status)

        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

const usersSlice = createSlice({ 
    name: "usersInfo",
    initialState: {
        users: [],
        fetchStatus: null, //"pending", "fulfilled", "rejected"
    },

    reducers: {  },

    //Здесь state - это св-во "usersInfo" в общем объекте состояния (см. store.js)
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.fetchStatus = "pending";
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.fetchStatus = "fulfilled";

            state.users.length = 0;
            for (let userObject of action.payload) {
                state.users.push(userObject);
            }
            //Сортируем массив по userObject.id, чтобы можно было быстро находить userObject. В общем случае не факт, что он придёт уже отсортированным.
            state.users.sort((userObject1, userObject2) => {
                return userObject1.id - userObject2.id;
            });
        },
        [fetchUsers.rejected]: (state) => {
            state.fetchStatus = "rejected";
        },
    }
});

export const usersStateReducer = usersSlice.reducer;