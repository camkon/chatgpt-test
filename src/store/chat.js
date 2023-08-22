import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    list: [],
}

const chatSlice = createSlice({
    name: 'chatData',
    initialState,
    reducers: {
        setChatQuestion(state, action) {state.list.push(action.payload)},
        
        setChatAnswer(state, action) {state.list = state.list.map(i => i.id === action.payload[0] ? {...i, answer: action.payload[1].answer, sources: action.payload[1].sources} : i)},
        
        setChatError(state, action) {state.list = state.list.map(i => i.id === action.payload[0] ? {...i, error: action.payload[1].message} : i)},
    }
})

export const chatAction = chatSlice.actions

export default chatSlice.reducer