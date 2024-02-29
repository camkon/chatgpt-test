import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    history: [],
}

const historySlice = createSlice({
    name: 'historyData',
    initialState,
    reducers: {
        setHistory(state, action) {state.history = action.payload},
    }
})

export const historyAction = historySlice.actions

export default historySlice.reducer