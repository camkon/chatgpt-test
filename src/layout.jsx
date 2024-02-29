import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Backdrop, CircularProgress } from '@mui/material'

import Header from './components/header'
import Chat from './components/chat'
import File from './components/file'
import ToasterComponent from './components/alert/toaster'
import Search from './components/search'
import Prompt from './components/prompt'
import { promptAction } from './store/prompt'
import History from './components/history'

const Layout = () => {

    const dispatch = useDispatch()
    const {tab} = useSelector(state => state.prompt)
    const loading = useSelector(state => state.files.loading)  

    return (
        <Box sx={{minHeight: '100vh', width: '100vw', background: '#343541', position: 'relative'}}>
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10}}><CircularProgress /></Backdrop>
            <ToasterComponent />
            <Header page={tab} setPage={(e) => dispatch(promptAction.setTab(e))}/>
            {tab === 'chat' && <Chat />}
            {tab === 'prompt' && <Prompt />}
            {tab === 'search' && <Search />}
            {tab === 'files' && <File />}
            {tab === 'history' && <History />}
            {tab === 'settings' && <File />}
        </Box>
    )
}

export default Layout
