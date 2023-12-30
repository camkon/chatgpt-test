import { Cancel, Search, Send } from '@mui/icons-material'
import { Box, IconButton, Paper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { promptAction } from '../../store/prompt'

const PromptInput = ({handleSend, loading}) => {

  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const {prompt} = useSelector(state => state.prompt)

  useEffect(() => {
    if(!loading) inputRef.current.focus()
  }, [loading])

  return (
    <Box sx={{minHeight: '7rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Paper elevation={1} sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '2rem auto 2rem auto', width: {xs: '90%', lg: '50%'}, padding: '0.5rem 0.5rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>
            <textarea 
                autoFocus={true}
                value={prompt}
                onChange={(e) => {dispatch(promptAction.setPrompt(e.target.value))}}
                // onKeyDown={(e) => {
                //   if(e.key === 'Enter' && !loading) {handleSend()}
                // }}
                aria-multiline
                type="text" 
                placeholder='Enter Prompt' 
                style={{
                    border: 'none', 
                    outline: 'none',
                    background: 'transparent', 
                    fontSize: '1rem', 
                    color: '#fff',
                    padding: '0.5rem',
                    boxSizing: 'border-box',
                    width: '100%',
                    resize: 'none',
                }}                
                ref={inputRef}
                rows={10}
            />
          <IconButton disabled={loading} onClick={handleSend} sx={{borderRadius: '0.5rem'}}><Send sx={{color: prompt !== '' ? '#fff' : '#6b6c7b'}}/></IconButton>            
        </Paper>
    </Box>
  )
}

export default PromptInput
