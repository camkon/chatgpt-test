import { useState } from 'react'

import { Box } from '@mui/material'

import Header from './components/header'
import Chat from './components/chat'
import File from './components/file'
import ToasterComponent from './components/alert/toaster'
import Search from './components/search'

const Layout = () => {

    const [page, setPage] = useState('chat')

    return (
        <Box sx={{minHeight: '100vh', width: '100vw', background: '#343541', position: 'relative'}}>
            <ToasterComponent />
            <Header page={page} setPage={setPage}/>
            {page === 'chat' && <Chat />}
            {page === 'search' && <Search />}
            {page === 'files' && <File />}
        </Box>
    )
}

export default Layout
