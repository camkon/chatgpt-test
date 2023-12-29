import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    prompt: '',
    response: [],
}

const promptSlice = createSlice({
    name: 'promptData',
    initialState,
    reducers: {
        setPrompt(state, action) {state.prompt = action.payload},
        
        setResponse(state, action) {state.response = action.payload},
    }
})

export const promptAction = promptSlice.actions

export default promptSlice.reducer