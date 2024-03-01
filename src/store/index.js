import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './chat'
import filesReducer from './files'
import searchReducer from './search'
import promptReducer from './prompt'
import historyReducer from './history'
import settingsReducer from './settings'

const store = configureStore({
    reducer: {
        chat: chatReducer,
        files: filesReducer,
        search: searchReducer,
        prompt: promptReducer,
        history: historyReducer,
        settings: settingsReducer,
    }},
)

export default store