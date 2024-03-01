import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    settings: null,
}

const settingsSlice = createSlice({
    name: 'settingsData',
    initialState,
    reducers: {
        setSettings(state, action) {state.settings = action.payload},
    }
})

export const settingsAction = settingsSlice.actions

export default settingsSlice.reducer