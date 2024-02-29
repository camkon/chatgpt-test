import { Box, Button } from '@mui/material'
import React from 'react'

const Header = ({page, setPage}) => {
  return (
    <Box sx={{position: 'sticky', top: '0', zIndex: 100, height: '3.8rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '1rem', borderBottom: '1px solid #2a2b32', background: '#343541'}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '0.25rem', background: '#202123', padding: '0.25rem', borderRadius: '0.5rem', color: '#ececf1', maxWidth: '90vw', margin: '0 0.5rem', overflowX: 'scroll'}}>
            <Button onClick={() => {setPage('chat')}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: page === 'chat' ? '#40414f' : 'transparent', ':hover': {background: page === 'chat' ? '#40414f' : '#2a2b32'}}}>CHAT</Button>
            <Button onClick={() => {setPage('search')}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: page === 'search' ? '#40414f' : 'transparent', ':hover': {background: page === 'search' ? '#40414f' : '#2a2b32'}}}>SEARCH</Button>
            <Button onClick={() => {setPage('prompt')}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: page === 'prompt' ? '#40414f' : 'transparent', ':hover': {background: page === 'prompt' ? '#40414f' : '#2a2b32'}}}>PROMPT</Button>
            <Button onClick={() => {setPage('files')}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: page === 'files' ? '#40414f' : 'transparent', ':hover': {background: page === 'files' ? '#40414f' : '#2a2b32'}}}>FILES</Button>
            <Button onClick={() => {setPage('history')}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: page === 'history' ? '#40414f' : 'transparent', ':hover': {background: page === 'history' ? '#40414f' : '#2a2b32'}}}>HISTORY</Button>
            <Button onClick={() => {setPage('settings')}} sx={{padding: '0.5rem 2rem', color: '#ececf1', background: page === 'settings' ? '#40414f' : 'transparent', ':hover': {background: page === 'settings' ? '#40414f' : '#2a2b32'}}}>SETTINGS</Button>
        </Box>
    </Box>
  )
}

export default Header
