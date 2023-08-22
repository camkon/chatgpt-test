import { Box, Button } from '@mui/material'
import React from 'react'

const Header = ({page, setPage}) => {
  return (
    <Box sx={{height: '3.8rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '1rem', borderBottom: '1px solid #2a2b32'}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '0.25rem', background: '#202123', padding: '0.25rem', borderRadius: '0.5rem', color: '#ececf1'}}>
            <Button onClick={() => {setPage(true)}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: page ? '#40414f' : 'transparent', ':hover': {background: page ? '#40414f' : '#2a2b32'}}}>CHAT</Button>
            <Button onClick={() => {setPage(false)}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: !page ? '#40414f' : 'transparent', ':hover': {background: !page ? '#40414f' : '#2a2b32'}}}>FILES</Button>
        </Box>
    </Box>
  )
}

export default Header
