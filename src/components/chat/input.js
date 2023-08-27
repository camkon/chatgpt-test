import { Send } from '@mui/icons-material'
import { Box, IconButton, Paper } from '@mui/material'
import { useEffect, useRef } from 'react'

const ChatInput = ({value, setValue, handleSend, loading}) => {

  const focusRef = useRef(null)

  useEffect(() => {
    if(!loading) focusRef.current.focus()
  }, [loading])

  return (
    <Box sx={{minHeight: '7rem', width: '100%', backgroundImage: 'linear-gradient(to top, #353740, #353740, #353740, transparent)'}}>
        <Paper elevation={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', width: {xs: '90%', lg: '50%'}, padding: '0.5rem 0.5rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>
            <input 
                autoFocus={true}
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
                onKeyDown={(e) => {if(e.key === 'Enter' && !loading) {handleSend()}}}
                aria-multiline
                type="text" 
                placeholder='Send Message' 
                style={{
                    border: 'none', 
                    outline: 'none', 
                    background: 'transparent', 
                    fontSize: '1rem', 
                    color: '#fff',
                    padding: '0.5rem',
                    boxSizing: 'border-box',
                    width: '100%'
                }}
                ref={focusRef}
            />
            <IconButton disabled={loading} onClick={handleSend} sx={{borderRadius: '0.5rem'}}><Send sx={{color: value !== '' ? '#fff' : '#6b6c7b'}}/></IconButton>
        </Paper>
    </Box>
  )
}

export default ChatInput
