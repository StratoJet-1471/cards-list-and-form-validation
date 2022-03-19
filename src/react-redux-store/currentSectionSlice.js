import { createSlice } from '@reduxjs/toolkit';

const currentSectionSlice = createSlice({ 
    name: 'currentSection',
    initialState: "userCardsList",
    reducers: {
        //setCurrentSection: (_, action) => { state = action.payload; } //Так получается ошибка
        setCurrentSection: (_, action) =>  action.payload
    }
});

export const {setCurrentSection} = currentSectionSlice.actions;
export const currentSectionReducer = currentSectionSlice.reducer;