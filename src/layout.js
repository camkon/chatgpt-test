import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, Backdrop, CircularProgress } from '@mui/material'

import Header from './components/header'
import Chat from './components/chat'
import File from './components/file'
import ToasterComponent from './components/alert/toaster'
import Search from './components/search'

const Layout = () => {

    const [page, setPage] = useState('chat')
    const loading = useSelector(state => state.files.loading)

    return (
        <Box sx={{minHeight: '100vh', width: '100vw', background: '#343541', position: 'relative'}}>
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10}}><CircularProgress /></Backdrop>
            <ToasterComponent />
            <Header page={page} setPage={setPage}/>
            {page === 'chat' && <Chat />}
            {page === 'search' && <Search />}
            {page === 'files' && <File />}
        </Box>
    )
}

export default Layout
