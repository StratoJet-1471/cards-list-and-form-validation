import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {usersStateReducer} from './usersSlice.js';
import {currentSectionReducer} from './currentSectionSlice.js';

export default configureStore({
    reducer: combineReducers({
            usersInfo: usersStateReducer,    
            currentSection: currentSectionReducer
        }),
    

    preloadedState: {
        usersInfo: {
            users: [],
            fetchStatus: null, //"pending", "fulfilled", "rejected"
            initialFetchDone: false,
        },
        currentSection: "userCardsList"
    }
  })