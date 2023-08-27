import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './chat'
import filesReducer from './files'
import searchReducer from './search'

const store = configureStore({
    reducer: {
        chat: chatReducer,
        files: filesReducer,
        search: searchReducer,
    }},
)

export default store