import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    list: [],
    selectedFiles: [],
}

const filesSlice = createSlice({
    name: 'filesData',
    initialState,
    reducers: {
        setList(state, action) {state.list = action.payload},

        setSelctedFiles(state, action) {state.selectedFiles = action.payload},
        
        removeSelectedFiles(state, action) {state.selectedFiles = state.selectedFiles.filter((item,index) => index !== action.payload)},
    }
})

export const filesAction = filesSlice.actions

export default filesSlice.reducer