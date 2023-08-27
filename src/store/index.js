import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './chat'
import filesReducer from './files'

const store = configureStore({
    reducer: {
        chat: chatReducer,
        files: filesReducer,
    }},
)

export default store