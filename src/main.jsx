import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store';
import SignInModule from './components/auth/sign-in/index.jsx'
import { ThemeProvider, createTheme } from '@mui/material'
import {custom} from './theme'

const theme = createTheme({
  components: custom.components,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
            <Route path='*' element={<SignInModule />}/>
            <Route index path='/sign-in' element={<SignInModule />}/>
            <Route path='/' element={<App />}/>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
