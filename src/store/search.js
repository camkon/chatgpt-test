import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    question: '',
    answer: [],
}

const searchSlice = createSlice({
    name: 'searchData',
    initialState,
    reducers: {
        setQuestion(state, action) {state.question = action.payload},
        
        setAnswer(state, action) {state.answer = action.payload},
    }
})

export const searchAction = searchSlice.actions

export default searchSlice.reducer