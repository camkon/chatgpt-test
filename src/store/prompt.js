import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    tab: 'chat',
    prompt: '',
    response: [],
}

const promptSlice = createSlice({
    name: 'promptData',
    initialState,
    reducers: {
        setTab(state, action) {state.tab = action.payload},
        
        setPrompt(state, action) {state.prompt = action.payload},
        
        setResponse(state, action) {state.response = action.payload},
    }
})

export const promptAction = promptSlice.actions

export default promptSlice.reducer