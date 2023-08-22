import { useState } from 'react'

import { Box } from '@mui/material'

import Header from './components/header'
import Chat from './components/chat'
import File from './components/file'

const Layout = () => {

    const [page, setPage] = useState(true)

    return (
        <Box sx={{height: '100vh', width: '100vw', background: '#343541'}}>
            <Header page={page} setPage={setPage}/>
            {page ? <Chat /> : <File />}
        </Box>
    )
}

export default Layout
